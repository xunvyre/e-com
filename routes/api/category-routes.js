const router = require('express').Router();
const { Category, Product } = require('../../models');

//get all categories
router.get('/', (req, res) =>
{
  Category.findAll
  ({
      include: 
      {
        model: Product,
        attributes: ['product_name']
      }
  })
    .then(categoryData => res.json(categoryData))
    .catch(err =>
    {
      console.log(err);
      res.status(500).json(err);
    });
});

//get single category by id
router.get('/:id', (req, res) =>
{
  Category.findOne
  ({
    where: {id: req.params.id},
    include:
    {
      model: Product,
      attributes: ['category_id']
    }
  })
    .then(categoryData => res.json(categoryData))
    .catch(err =>
    {
      console.log(err);
      res.status(500).json(err);
    });
});

//create category
router.post('/', (req, res) =>
{
  Category.create
  ({
    category_name: req.body.category_name
  })
    .then(categoryData => res.json(categoryData))
    .catch(err =>
    {
      console.log(err);
      res.status(500).json(err);
    });
});

//update category by id
router.put('/:id', (req, res) => {
  Category.update
  (
    {category_name: req.body.category_name},
    {where:{id: req.params.id}}
  )
    .then(categoryData =>
    {
      if (!categoryData)
      {
        res.status(404).json({message: 'No category under that ID.'});
        return;
      }
      res.json(categoryData);
    })
    .catch(err =>
    {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete category by id
router.delete('/:id', (req, res) =>
{
  Category.destroy({where: {id: req.params.id}})
    .then(categoryData =>
    {
      if (!categoryData)
      {
        res.status(404).json({message: 'No category under that ID.'});
        return;
      }
      res.json(categoryData);
    })
    .catch(err =>
    {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
