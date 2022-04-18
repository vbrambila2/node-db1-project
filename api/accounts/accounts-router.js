const express = require('express');
const Account = require('./accounts-model');

const router = require('express').Router()

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  const data = await Account.getAll();
  res.json(data);
})

router.get('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  const data = await Account.getById(req.params.id);
  res.json(data);
})

router.post('/', async (req, res, next) => {
  // DO YOUR MAGIC
  const data = await Account.create(req.body);
  res.json(data);
})

router.put('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  const data = await Account.updateById(req.params.id, req.body)
  res.json(data);
});

router.delete('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  const data = await Account.deleteById(req.params.id);
  res.json(data);
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
