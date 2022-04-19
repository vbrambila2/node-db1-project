const Account = require('./accounts-model');
const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  if (req.body.name === undefined || req.body.budget === undefined) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" });
  } else if (typeof req.body.budget !== 'number' || isNaN(req.body.budget)) {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" });
  }

    next()
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    console.log("one");
    const existing = await db('accounts').where('name', req.body.name.trim()).first()

    if (existing) {
      next({ status: 400, message: "that name is taken" })
      console.log("two");
    } else {
      console.log("three");
      next()
    }
  } catch (err) {
    console.log("four");
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getById(req.params.id)
    if (!account) {
      next({ status: 404, message: "account not found" })
    } else {
      req.account = account
      next()
    }
  } catch (err) {
    next(err)
  }
}
