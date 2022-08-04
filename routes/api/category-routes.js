const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // TODO: find all categories
  try {
    const allCategories = await Category.findAll({
      // TODO: include its associated Products
      include: [{ model: Product }]
    })
    res.status(200).json(allCategories)
  }
  catch (err) {
    res.status(400).json(err)
  }
});

router.get('/:id', (req, res) => {
  // TODO: find ONE category by its `id` value
  try {
    const allCategories = await Category.findByPk(req.params.id, {
      // TODO: include its associated Products
      include: [{ model: Product }]
    })
    res.status(200).json(allCategories)
  }
  catch (err) {
    res.status(400).json(err)
  }
});

router.post('/', (req, res) => {
  // TODO: create a new category
    try {
      const newCateg = await req.body;
      Category.create(newCateg);
      res.status(201).json(newCateg)
    }
    catch (err) {
      res.status(500).json(err)
    }
  });


router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
