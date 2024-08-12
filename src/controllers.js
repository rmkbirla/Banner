const db = require('./database');
let timerInterval; 


exports.createBanner = async (req, res) => {
    const {description, timer, link , image} = req.body;

    try {
        // Insert a new banner
        await db.query('INSERT INTO bann (description, timer, link) VALUES (?, ?, ?)', [description, timer, link, image]);
        res.status(201).json({ message: "Banner created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




const updateTimer = async () => {
    try {
        const [results] = await db.query(`
            UPDATE bann
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
            timerInterval=0;
            // console.log('No visible banners left.');
        }
    } catch (err) {
        console.error('Error updating timers:', err);
    }
};

exports.getAllBanners = async (req, res) => {
    try {
        
        const [rows] = await db.query('SELECT * FROM bann');
        
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBanner = async (req, res) => {
    const {id} = req.params;

    try {
        const [rows] = await db.query(`SELECT * FROM bann WHERE id = ${id}`);
        if(rows[0].timer!=0){
        await db.query('UPDATE bann SET is_visible = 1 WHERE id = ?', [id]);
        }
        if(rows[0].timer>0){
        res.json(rows[0]);
        }
        else{
            res.json({message : "banner is expired!"});
            // console.log(rows[0].timer, rows[0].is_visible);
        }
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    if (!timerInterval) { 
        timerInterval = setInterval(updateTimer, 1000);
    }


};


exports.updateBanner = async (req, res) => {
    const { description, timer, link, image} = req.body;
    const {id} = req.params;

    // Initialize query parts
    let query = 'UPDATE bann SET';
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
    if (link !== undefined) {
        query += ' link = ?,';
        queryParams.push(link);
    }
    if (image !== undefined) {
        query += ' image = ?,';
        queryParams.push(image);
    }
   
    // Remove trailing comma and add the WHERE clause
    query = query.slice(0, -1) + ' WHERE id = ?';

    queryParams.push(id);
    

    try {
        await db.query(query, queryParams);
        const [banner] = await db.query(`SELECT * FROM bann WHERE id = ${id}`);
        res.status(200).json({ message: "Banner updated successfully", banner: banner });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteBanner = async (req, res) => {
    const { id } = req.params;

    try {
        // Perform the deletion
        const [result] = await db.query('DELETE FROM bann WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Banner deleted successfully' });
        } else {
            res.status(404).json({ message: 'Banner not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; 
