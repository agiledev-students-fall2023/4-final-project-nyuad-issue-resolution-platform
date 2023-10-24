import './IssueCard.css';

function IssueCard({ issue }) {
   return (
      <div key={issue.index} className="issue-card">
         <h4 className='admin-dashboard-studentName'>{issue.studentName} ({issue.studentNetID})</h4>
         <h4>{issue.title}</h4>
         <p>{issue.description}</p>
         <div className={`priority-tag ${issue.currentPriority.toLowerCase().replace(/\s+/g, '')}`}>
            {issue.currentPriority}
         </div>
         <div className="issue-date">{issue.dateCreated}</div>
      </div>
   );
}

export default IssueCard;
