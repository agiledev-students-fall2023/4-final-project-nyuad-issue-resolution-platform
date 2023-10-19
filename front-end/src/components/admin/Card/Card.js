import './Card.css';

const Card = ({ onOpen, props }) => {
    const cardobj = {
      cardUsername: props.userName,
      cardTitle: props.title,
      cardIssueDesc: props.issueDescription,
      cardTags: props.tags
    };

    const SendcarddatatoApp = () => {
      onOpen(cardobj);
    };

    return (
    <div className="card">
      <div className="user-info">
        <span>{cardobj.cardUsername}</span>
      </div>
      <h2>{cardobj.cardTitle}</h2>
      <p>{cardobj.cardIssueDesc}</p>
      <div className="tags">
      {cardobj.cardTags.map((tag, index) => (
      <span key={index} className="tag">
        {tag}
      </span>
        ))}
      </div>

    <button onClick={SendcarddatatoApp}> View More</button>
    </div>
);
};
export default Card;
