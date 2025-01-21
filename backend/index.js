const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

let contacts = [
    {
        "id": "1",
        "name": "John Doe",
        "mobile": "9876543210",
        "email": "john.doe@gmail.com"
    },
    {
        "id": "2",
        "name": "Mira Kapoor",
        "mobile": "8765432108",
        "email": "mira.kapoor@gmail.com"
    },
    {
        "id": "3",
        "name": "Saisha Jack",
        "mobile": "0987524332",
        "email": "saisha.jack@gmail.com"
    }
]; // Mock database

// CRUD endpoints
app.get('/contacts', (req, res) => res.json(contacts));
app.post('/contacts', (req, res) => {
    const contact = { id: Date.now(), ...req.body };
    contacts.push(contact);
    res.status(201).json(contact);
});
app.put('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const index = contacts.findIndex(c => c.id == id);
    if (index > -1) {
        contacts[index] = { ...contacts[index], ...req.body };
        res.json(contacts[index]);
    } else res.status(404).json({ message: 'Contact not found' });
});
app.delete('/contacts/:id', (req, res) => {
    const { id } = req.params;
    contacts = contacts.filter(c => c.id != id);
    res.json({ message: 'Contact deleted' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
