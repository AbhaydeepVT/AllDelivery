const router = require('express').Router();
const auth = require('../middleware/auth.cjs');
const User = require('../models/User.cjs');

// GET user's cart
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('cart.product');
    res.json(user.cart || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (replace) user's cart
router.put('/', auth, async (req, res) => {
  try {
    const { items } = req.body; // array of { product: ID, quantity }
    const user = await User.findById(req.userId);
    user.cart = items;
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;