const express = require('express');
const promisePool = require('./mysql'); 
const { join } = require('path');

const app = express();
const port = 5000;
const host = 'localhost';

app.get('/blogit', async (req, res) => {
    try {
    const [rows] = await promisePool.query('SELECT * FROM blogi');
    res.json(rows);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve blog data' });
}
});


app.get('/blogitJulkaistu', async (req, res) => {
    try {
        const [rows] = await promisePool.query(`
            SELECT b.nimi AS blogin_nimi, bk.otsikko, bk.teksti, bk.julkaisuaika
            FROM blogikirjoitus bk
            JOIN blogi b ON bk.blogi_id = b.blogi_id
            ORDER BY bk.julkaisuaika ASC
        `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve blog post data' });
    }
});

app.listen(port, host, () => console.log(`${host}:${port} kuuntelee...`));
