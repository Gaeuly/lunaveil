const mongoose = require('mongoose');

const noPrefixSchema = new mongoose.Schema({
  User: { type: String, required: true },
});

module.exports = mongoose.model('noPrefix', noPrefixSchema);