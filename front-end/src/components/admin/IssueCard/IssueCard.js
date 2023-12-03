import './IssueCard.css';
import { useEffect } from 'react';

function IssueCard({ issue }) {
   const BASE_URL = process.env.REACT_APP_FRONTEND_URL;
   useEffect(() => {
   }, []);
   const onClickIssueCard = async (event) => {
      const url = `${BASE_URL}/admin/dashboard/` + issue.index;
      window.open(url, '_blank');
      // navigate('/admin/dashboard/' + (issue.index));
   };
   return (
      <div onClick = {onClickIssueCard} key={issue.index} className="issue-card-admin">
         <h4 className="issue-card-admin-name-id">{issue.studentName} ({issue.studentNetID})</h4>
         <h4 className="issue-card-admin-title">{issue.title}</h4>
         <p className="issue-card-admin-description">{issue.description}</p>
         <div className={`issue-card-admin-priority-tag ${issue.currentPriority.toLowerCase().replace(/\s+/g, '')}`}>
            {issue.currentPriority}
         </div>
         <div className="issue-card-admin-date">{issue.dateCreated}</div>
      </div>
   );
};

export default IssueCard;
