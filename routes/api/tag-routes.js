const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

//get all tags
router.get('/', (req, res) =>
{
  Tag.findAll
  ({ include: {model: Product} })
    .then(tagData => res.json(tagData))
    .catch(err =>
    {
      console.log(err);
      res.status(500).json(err);
    });
});

//get single tag by id
router.get('/:id', (req, res) =>
{
  Tag.findOne
  ({
    where: {id: req.params.id},
    include: {model: Product}
  })
    .then(tagData => res.json(tagData))
    .catch(err =>
    {
      console.log(err);
      res.status(500).json(err);
    });
});

//create a new tag
router.post('/', (req, res) =>
{
  Tag.create
  ({ tag_name: req.body.tag_name })
    .then(tagData => res.json(tagData))
    .catch(err =>
    {
      console.log(err);
      res.status(500).json(err);
    });
});

//update tag by id
router.put('/:id', (req, res) =>
{
  Tag.update
  (
    {tag_name: req.body.tag_name},
    {where: {id: req.params.id}}
  )
    .then(tagData =>
    {
      if (!tagData)
      {
        res.status(404).json({message: 'No tag exists under given ID.'});
        return;
      }
      res.json(tagData);
    })
    .catch(err =>
    {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete tag by id
router.delete('/:id', (req, res) =>
{
  Tag.destroy
  ({ where: {id: req.params.id} })
    .then(tagData =>
    {
      if (!tagData)
      {
        res.status(404).json({message: 'No tag exists under given ID.'});
        return;
      }
      res.json(tagData);
    })
    .catch(err =>
    {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
