import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    index: Number,
    studentNetID: [String],
    studentName: [String],
    title: String,
    description: String,
    attachments: [String],
    departments: [{
        type: String,
        enum: ['IT', 'Admin', 'Library', 'Facilities', 'Registrar', 'Health', 'Finance', 'GlobalEd', 'ResEd', 'CDC'],
    }],
    comments: [String],
    dateCreated: String,
    timeCreated: String,
    currentStatus: {
        type: String,
        enum: ['Open', 'In Progress', 'Action Required', 'Resolved'],
    },
    currentPriority: {
        type: String,
        enum: ['New', 'High Priority', 'Reopened'],
    }
});

const IssueModel = mongoose.model('Issue', issueSchema);

export default IssueModel;
