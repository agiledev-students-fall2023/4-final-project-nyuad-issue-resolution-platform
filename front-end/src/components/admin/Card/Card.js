import './Card.css';

const Card = ({ onOpen, props }) => {
    const cardobj = {
      cardUsername: props.userName,
      cardTitle: props.title,
      cardIssueDesc: props.issueDescription,
      cardTags: props.tags
    };

    const sendCardDatatoApp = () => {
      onOpen(cardobj);
    };

    return (
    <div onClick ={sendCardDatatoApp} className="card">
      <div className="user-info">
        <span>{cardobj.cardUsername}</span>
      </div>
      <div className="card-title">
          <h2>{cardobj.cardTitle}</h2>
      </div>
      <p>{cardobj.cardIssueDesc}</p>
      <div className="tags">
      {cardobj.cardTags.map((tag, index) => (
      <span key={index} className="tag">
        {tag}
      </span>
        ))}
      </div>
    </div>
);
};
export default Card;
