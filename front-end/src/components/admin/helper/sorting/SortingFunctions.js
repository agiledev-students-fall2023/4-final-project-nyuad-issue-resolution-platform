import ParseDate from "../ParseDate";

/* eslint-disable quote-props */
const priorityOrder = {
    'Reopened': 1,
    'High Priority': 2,
    'New': 3
};
/* eslint-enable quote-props */

// Function to sort by priority and date
const sortByPriorityAndDate = (a, b) => {
    // Check if the currentPriority of both items is the same
    if (a.currentPriority === b.currentPriority) {
        // If priorities are equal, sort by date in descending order (newest first)
        return ParseDate(b.dateCreated) - ParseDate(a.dateCreated);
    }
    // If priorities are different, sort by priority using a predefined order
    return priorityOrder[a.currentPriority] - priorityOrder[b.currentPriority];
};

// Function to sort by priority in reverse order and date
const sortByPriorityReverse = (a, b) => {
    // Check if the currentPriority of both items is the same
    if (a.currentPriority === b.currentPriority) {
        // If priorities are equal, sort by date in descending order (newest first)
        return ParseDate(b.dateCreated) - ParseDate(a.dateCreated);
    }
    // If priorities are different, sort by priority in reverse order
    // Note: This assumes that `priorityOrder` is a predefined object with priority values.
    return priorityOrder[b.currentPriority] - priorityOrder[a.currentPriority];
};

// Function to sort by date in ascending order (oldest first)
const sortByDateAscending = (a, b) => {
    // Sort by date in ascending order
    return ParseDate(a.dateCreated) - ParseDate(b.dateCreated);
};

// Function to sort by date in descending order (newest first)
const sortByDate = (a, b) => {
    // Sort by date in descending order
    return ParseDate(b.dateCreated) - ParseDate(a.dateCreated);
};

// Export the functions for use in other modules
export {
    sortByPriorityAndDate,
    sortByPriorityReverse,
    sortByDateAscending,
    sortByDate
};
