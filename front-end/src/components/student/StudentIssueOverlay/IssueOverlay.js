import { useState } from "react";
// // import "./IssueOverlay.css";

const [showIssueOverlay, setShowIssueOverlay] = useState(false);

// // Handles notification click to display a notification overlay
export const handleIssueClick = (index) => {
    setShowIssueOverlay(true);
    console.log(index, showIssueOverlay);
};
