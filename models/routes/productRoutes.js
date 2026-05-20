import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// 1. GET /api/products — Fetch all data records (Status: 200 OK)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// 2. GET /api/products/:id — Fetch a single data record by ID (Status: 200 OK / 404 Not Found)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Resource Error: Product parameters not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// 3. POST /api/products — Create a new dynamic data record (Status: 201 Created)
router.post('/', async (req, res) => {
  try {
    const { name, brand, price, stock } = req.body;
    const newProduct = new Product({ name, brand, price, stock });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// 4. PUT /api/products/:id — Update an existing record safely (Status: 200 OK / 404 Not Found)
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Resource Error: Target Product not found." });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// 5. DELETE /api/products/:id — Remove a record from system (Status: 200 OK / 404 Not Found)
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Resource Error: Target Product not found." });
    }
    res.status(200).json({ message: "Data node deleted successfully from Cluster registry." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
