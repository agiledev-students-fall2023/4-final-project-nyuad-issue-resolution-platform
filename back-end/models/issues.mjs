import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true
  },
  studentNetID: {
    type: [String],
    required: true
  },
  studentName: {
    type: [String],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  attachments: {
    type: [String], // You can change the type to store file paths or URLs if needed
    default: null
  },
  departments: {
    type: [String],
    required: true
  },
  comments: {
    type: [String],
    default: []
  },
  dateCreated: {
    type: Date,
    required: true
  },
  timeCreated: {
    type: String,
    required: true
  },
  currentStatus: {
    type: String,
    required: true
  },
  currentPriority: {
    type: String,
    required: true
  }
});

export const Issue = mongoose.model('Issue', issueSchema);
