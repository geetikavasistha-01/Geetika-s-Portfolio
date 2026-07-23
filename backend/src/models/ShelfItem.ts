import { Schema, model } from 'mongoose';

const ShelfItemSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['anime', 'book', 'game', 'music', 'paper'], required: true },
  label: { type: String, required: false },
  caption: { type: String, required: false },
  image: { type: String, required: false },
  order: { type: Number, required: true },
  
  // Reading Rack Fields
  author: { type: String },
  publisher: { type: String },
  color: { type: String },
  height: { type: String },
  isPaper: { type: Boolean, default: false },
  authors: { type: String },
  metadata: { type: String },
  tags: [{ type: String }],
  explanation: { type: String },
  amazonUrl: { type: String },
  goodreadsUrl: { type: String },
  arxivUrl: { type: String },
  paperUrl: { type: String },
  rackCategory: { type: String } // "Data Science & AI" or "Systems, Security & DevOps"
});

export const ShelfItem = model('ShelfItem', ShelfItemSchema);
