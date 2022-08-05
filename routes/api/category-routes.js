const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // TODO: find all categories
  try {
    const allCategories = await Category.findAll({
      // TODO: include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // TODO: find ONE category by its `id` value
  try {
    const categById = await Category.findByPk(req.params.id, {
      // TODO: include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categById);
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: create a new category
router.post("/", async (req, res) => {
  try {
    const newCateg = await req.body;
    Category.create(newCateg);
    res.status(201).json(newCateg);
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO: update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updateMe = await Category.findByPk(req.params.id);
    const updateCateg = await req.body;
    updateMe.update(updateCateg);
    res.status(200).json(updateCateg);
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO: delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deleteMe = await Category.findByPk(req.params.id);
    deleteMe.destroy();
    res.status(200).json("Category has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
