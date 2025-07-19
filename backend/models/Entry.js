import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  uid: { type: String, required: true }, // Firebase user ID
  title: String,
  description: String,
  category: String,
  mood: String,
  productivity: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Entry', entrySchema);
