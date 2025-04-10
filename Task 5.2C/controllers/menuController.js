const { getAllPizzas } = require('../services/pizzaService');

async function fetchMenu(req, res, db) {
  try {
    const pizzas = await getAllPizzas(db);
    res.json(pizzas);
  } catch (err) {
    console.error("Controller Error:", err);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
}

module.exports = { fetchMenu };
