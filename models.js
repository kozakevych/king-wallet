const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
  balance: Number,
  id: String
})

module.exports = mongoose.model('Wallet', WalletSchema);