const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get ALL products
router.get("/", async (req, res) => {
  // find all products
  try {
    const productDetails = await Product.findAll({
      //TODO: include its associated Category and Tag data
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(productDetails);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get ONE product
router.get("/:id", async (req, res) => {
  // find a single product by its `id`
  try {
    const productDetails = await Product.findbyPk(req.params.id, {
      //TODO: include its associated Category and Tag data
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(productDetails);
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: Create new product

router.post("/", (req, res) => {
  /* req.body should look like this...
      {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
      }
    */
  Product.create(req.body)
    .then((product) => {
      // if there are product tags, create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArray = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArray);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// TODO: update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newTagIds = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newTagIds),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // TODO: delete one product by its `id` value
  try {
    const deleteById = await Product.destroy ({where: {id:req.params.id}})
    res.status(200).json(deleteById)
  }
  catch(err){
    res.status(400).json(err)
  }
});

module.exports = router;
