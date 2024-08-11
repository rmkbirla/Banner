const db = require('./database');
let timerInterval; 

const updateTimer = async () => {
    try {
        // Decrease timer for visible banners
        const [results] = await db.query(`
            UPDATE banners
                SET 
                    timer = CASE
                        WHEN timer > 0 THEN timer - 1
                        ELSE 0
                    END,
                    is_visible = CASE
                        WHEN timer = 0 THEN 0
                        ELSE is_visible
                    END
            WHERE is_visible = 1;

`);
        
        if (results.affectedRows === 0) {
            clearInterval(timerInterval);
            console.log('No visible banners left.');
        } else {
            console.log('Timer updated.');
        }
    } catch (err) {
        console.error('Error updating timers:', err);
    }
};


exports.getBanner = async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await db.query(`SELECT * FROM banners WHERE id = ${id}`);
        if(rows[0].timer!=0){
        await db.query('UPDATE banners SET is_visible = 1 WHERE id = ?', [id]);
        }
        if(rows[0].timer>0){
        res.json(rows[0]);
        }
        else{
            res.json({message : "banner is expired!"});
        }
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    if (!timerInterval) { 
        timerInterval = setInterval(updateTimer, 1000);
    }


};



exports.updateBanner = async (req, res) => {
    const { description, timer, link} = req.body;
    const id = req.params.id;

    // Initialize query parts
    let query = 'UPDATE banners SET';
    const queryParams = [];
    
    // Add query parts conditionally
    if (description !== undefined) {
        query += ' description = ?,';
        queryParams.push(description);
    }
    if (timer !== undefined) {
        query += ' timer = ?,';
        queryParams.push(timer);
    }
    if (link !== undefined) {
        query += ' link = ?,';
        queryParams.push(link);
    }
   
    // Remove trailing comma and add the WHERE clause
    query = query.slice(0, -1) + ' WHERE id = ?';
    queryParams.push(id);

    try {
        await db.query(query, queryParams);
        res.status(200).json({ message: "Banner updated successfully"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
