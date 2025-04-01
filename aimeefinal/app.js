const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// MongoDB connection string (using the aimeeFinal database)
mongoose.connect('mongodb+srv://aimeereilly64:bolero321@clusterclass.7d2eshl.mongodb.net/aimeeFinal?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
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

// Use the existing 'vendors' collection (with data already inserted)
const Vendor = mongoose.model('vendors', vendorSchema);

// POST: Create a new vendor
app.post('/vendors', async (req, res) => {
    try {
        const vendor = new Vendor(req.body);
        await vendor.save();
        res.status(201).json({ message: 'Vendor added successfully', vendor });
    } catch (err) {
        res.status(400).json({ message: 'Failed to add vendor', error: err });
    }
});

// GET: Get all vendors
app.get('/vendors', async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
    } catch (err) {
        res.status(400).json({ message: 'Failed to retrieve vendors', error: err });
    }
});

// GET by ID: Get a vendor by ID
app.get('/vendors/:id', async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        res.status(200).json(vendor);
    } catch (err) {
        res.status(400).json({ message: 'Failed to retrieve vendor', error: err });
    }
});

// PUT: Update a vendor by ID
app.put('/vendors/:id', async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        res.status(200).json({ message: 'Vendor updated successfully', vendor });
    } catch (err) {
        res.status(400).json({ message: 'Failed to update vendor', error: err });
    }
});

// DELETE: Delete a vendor by ID
app.delete('/vendors/:id', async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        res.status(200).json({ message: 'Vendor deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Failed to delete vendor', error: err });
    }
});

const productSchema = new mongoose.Schema({
    vendorId: Number,
    name: String,
    category: String,
    material: String,
    price: Number,
    inStock: Number
});

const Product = mongoose.model('products', productSchema);

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const salesSchema = new mongoose.Schema({
    productId: Number,
    saleDate: Date,
    quantity: Number
});

const Sale = mongoose.model('sales', salesSchema);

app.get('/sales', async (req, res) => {
    try {
        const sales = await Sale.find();
        res.json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/sales', async (req, res) => {
    try {
        const sale = new Sale(req.body);
        await sale.save();
        res.status(201).json(sale);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const rentalAgreementSchema = new mongoose.Schema({
    vendorId: Number,
    rentalSize: String,
    rentFee: Number,
    commissionRate: Number,
    startDate: Date
});

const RentalAgreement = mongoose.model('rental_agreements', rentalAgreementSchema);

app.get('/rental-agreements', async (req, res) => {
    try {
        const rentals = await RentalAgreement.find();
        res.json(rentals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/rental-agreements', async (req, res) => {
    try {
        const rental = new RentalAgreement(req.body);
        await rental.save();
        res.status(201).json(rental);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/vendors');
});
