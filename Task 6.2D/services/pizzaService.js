async function getAllPizzas(db) {
  const collection = db.collection('pizzas')
  return await collection.find().toArray();
}

module.exports = { getAllPizzas };
