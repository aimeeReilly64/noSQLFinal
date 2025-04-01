const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/aimee_final', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error: ", err));

// Vendor Schema
const vendorSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    startDate: Date,
    isLocal: Boolean
});

const Vendor = mongoose.model('Vendor', vendorSchema);

// Routes for Vendor CRUD operations
app.post('/vendors', async (req, res) => {
    try {
        const vendor = new Vendor(req.body);
        await vendor.save();
        res.status(201).json({ message: 'Vendor added successfully', vendor });
    } catch (err) {
        res.status(400).json({ message: 'Failed to add vendor', error: err });
    }
});

app.get('/vendors', async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
    } catch (err) {
        res.status(400).json({ message: 'Failed to retrieve vendors', error: err });
    }
});

app.get('/vendors/:id', async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        res.status(200).json(vendor);
    } catch (err) {
        res.status(400).json({ message: 'Failed to retrieve vendor', error: err });
    }
});

app.put('/vendors/:id', async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        res.status(200).json({ message: 'Vendor updated successfully', vendor });
    } catch (err) {
        res.status(400).json({ message: 'Failed to update vendor', error: err });
    }
});

app.delete('/vendors/:id', async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        res.status(200).json({ message: 'Vendor deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Failed to delete vendor', error: err });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
