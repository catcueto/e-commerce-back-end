const router = require("express").Router();
const { restart } = require("nodemon");
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // TODO: find all tags
  try {
    const tags = await Tag.findAll({
      // TODO: include its associated Product data
      include: [{ model: Product }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: find a single tag by its `id`
router.get("/:id", async (req, res) => {
  try {
    const tagDetails = await Tag.findByPk(req.params.id, {
      // TODO: include its associated Product data
      include: [{ model: Product }],
    });
    res.status(200).json(tagDetails);
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: create a new tag
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(202).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO: update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const udpatedTag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(202).json(udpatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({ where: { id: req.params.id } });
    res.status(202).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
