const mongoose = require('mongoose')

const { Schema, model } = mongoose

const rankSchema = new Schema({
  name: String,
  count: Number
})

const rankModel = model('Ranks', rankSchema)

module.exports = rankModel