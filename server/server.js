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
        return res.status(400).send(String(e));
    }
});

app.post('/api/contacts', async (req, res) => {
    try {
        if (req.body.email === "") {
            req.body.email = null;
        }
        const result = await db.query(
            "INSERT INTO contacts(name, email, phone, notes) VALUES($1, $2, $3, $4) RETURNING *",
            [req.body.name, req.body.email, req.body.phone, req.body.notes],
        );
        const returnObj = {
            id: result.rows[0].id,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            notes: req.body.notes,
        }
        return res.status(200).json(returnObj);
    } catch (e) {
        return res.status(400).send(String(e));
    }
});

app.put('/api/contacts/:contactID', async (req, res) => {
    const id = parseInt(req.params.contactID);
	try {
		await db.query(
			"UPDATE contacts SET name = $1, email = $2, phone = $3, notes = $4 WHERE id = $5 RETURNING *", 
			[req.body.name, req.body.email, req.body.phone, req.body.notes, id]
		);
	} catch(e) {
        console.log(e);
		return res.status(400).send(String(e));
	}
	return res.end();
});

app.delete('/api/contacts/:contactID', async (req, res) => {
    const id = parseInt(req.params.contactID);
	try {
		await db.query("DELETE FROM contacts WHERE id = $1", [id]);
	} catch(error) {
		return res.status(400).send(String(e));
	}
	return res.end();
});


app.listen(PORT, () => {
    console.log(`Hi! Server is listening on ${PORT}`);
});