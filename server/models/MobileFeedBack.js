import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MobileFeedBackSchema = new Schema({
  name: String,
  content: String,
  date: String,
  version: String
});

module.exports = mongoose.model('MobileFeedBack', MobileFeedBackSchema);
