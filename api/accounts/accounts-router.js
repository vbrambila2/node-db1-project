const express = require('express');
const Account = require('./accounts-model');

const router = express.Router()

const { checkAccountPayload, checkAccountId, checkAccountNameUnique } = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getAll();
    res.json(data);
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accountInfo = ({ name: req.body.name.trim(), budget: req.body.budget })
    console.log(req.body)
    const data = await Account.create(accountInfo);
    res.status(201).json(data);
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  const data = await Account.updateById(req.params.id, req.body)
  res.json(data);
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  await Account.deleteById(req.params.id);
  res.json(req.account);
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
