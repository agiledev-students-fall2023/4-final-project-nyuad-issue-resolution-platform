import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true,
        unique: true,
    },
    studentNetID: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    attachments: {
        type: [String],
        required: true,
    },
    departments: {
        type: [{
            type: String,
            enum: ['IT', 'Admin', 'Library', 'Facilities', 'Registrar', 'Health', 'Finance', 'GlobalEd', 'ResEd', 'CDC', 'admin'],
        }],
        required: true,
    },
    comments: {
        type: [String],
        required: true,
    },
    dateCreated: {
        type: String,
        required: true,
    },
    timeCreated: {
        type: String,
        required: true,
    },
    currentStatus: {
        type: String,
        enum: ['Open', 'In Progress', 'Action Required', 'Resolved'],
        required: true,
    },
    currentPriority: {
        type: String,
        enum: ['New', 'High Priority', 'Reopened', ""],
    },
    isProposed: {
        type: Boolean,
        default: false,
        required: true,
    },
    isProposedDate: {
        type: String,
        default: "",
    },
});

const IssueModel = mongoose.model('Issue', issueSchema);

export default IssueModel;
