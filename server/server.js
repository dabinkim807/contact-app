const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');


const app = express();
const PORT = process.env.PORT || 8081;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Hello, this is Dana's template ExpressJS with React-Vite" });
});

app.get('/api/contacts', async (req, res) => {
    try {
        const { rows: contacts } = await db.query('SELECT * FROM contacts ORDER BY id ASC');
        res.send(contacts);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

app.get('/api/contacts/:contactID', async (req, res) => {
    const id = parseInt(req.params.contactID);
    try {
        const { rows: contacts } = await db.query("SELECT * FROM contacts WHERE id = $1", [id]);
        res.send(contacts);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

app.post('/api/contacts', async (req, res) => {
    try {
        await db.query(
            "INSERT INTO contacts(name, email, phone, notes) VALUES($1, $2, $3, $4) RETURNING *",
            [req.body.name, req.body.email, req.body.phone, req.body.notes],
        );
    } catch (e) {
        return res.status(400).json({ e });
    }
    return res.end();
});

app.put('/api/contacts/:contactID', async (req, res) => {
    const id = parseInt(req.params.contactID);
	try {
		await db.query(
			"UPDATE contacts SET name = $1, email = $2, phone = $3, notes = $4 WHERE id = $5 RETURNING *", 
			[req.body.name, req.body.email, req.body.phone, req.body.notes, id]
		);
	} catch(error) {
		console.log(error);
	}
	return res.end();
})

app.delete('/api/contacts/:contactID', async (req, res) => {
    const id = parseInt(req.params.contactID);
	try {
		await db.query("DELETE FROM contacts WHERE id = $1", [id]);
	} catch(error) {
		return res.status(400).json({ e });
	}
	return res.end();
});


app.listen(PORT, () => {
    console.log(`Hi! Server is listening on ${PORT}`);
});