import mongoose from "mongoose";
import sanitize from "mongo-sanitize";

const issueSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
    unique: true
  },
  studentNetID: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
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
    type: [String],
    required: true
  },
  departments: {
    type: [
      {
        type: String,
        enum: [
          "IT",
          "Admin",
          "Library",
          "Facilities",
          "Registrar",
          "Health",
          "Finance",
          "GlobalEd",
          "ResEd",
          "CDC",
          "admin"
        ]
      }
    ],
    required: true
  },
  comments: {
    type: [String],
    required: true
  },
  dateCreated: {
    type: String,
    required: true
  },
  timeCreated: {
    type: String,
    required: true
  },
  currentStatus: {
    type: String,
    enum: ["Open", "In Progress", "Action Required", "Resolved"],
    required: true
  },
  currentPriority: {
    type: String,
    enum: ["New", "High Priority", "Reopened", ""]
  },
  isProposed: {
    type: Boolean,
    default: false,
    required: true
  },
  isProposedDate: {
    type: String,
    default: ""
  }
});

// Sanitize inputs before saving
issueSchema.pre("save", function (next) {
  sanitizeIssue(this);
  next();
});

// Sanitize inputs before updating
issueSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  // Sanitize each path in the update object
  Object.keys(update).forEach((path) => {
    if (update[path]) {
      update[path] = sanitize(update[path]);
    }
  });

  next();
});

// Helper function to sanitize issue data
function sanitizeIssue(issue) {
  Object.keys(issueSchema.paths).forEach((path) => {
    if (issueSchema.paths.hasOwnProperty(path) && issue[path]) {
      issue[path] = sanitize(issue[path]);
    }
  });
}

const IssueModel = mongoose.model("Issue", issueSchema);

export default IssueModel;
