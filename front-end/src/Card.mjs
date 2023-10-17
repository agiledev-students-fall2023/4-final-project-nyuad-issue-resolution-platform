/* eslint-disable */
const Card = ({onOpen ,props}) => {

    const username = props.username
    const title = props.title
    const issuedescription = props.issuedescription
    const tags = props.tags

    const cardobj = {
      carduserName : username,
      cardTitle : title,
      cardIssueDes: issuedescription,
      cardTags : tags
    };

    const SendcarddatatoApp = ()=>{
      onOpen(cardobj)
    }

 
 
    return ( 
    <div className="card">
      <div className="user-info">
        <span>{username}</span>
      </div>
      <h3>{title}</h3>
      <p>{issuedescription}</p>
      <div className="tags">
      {tags.map((tag, index) => (
      <span key={index} className="tag">
        {tag}
      </span>
        ))}
      </div>

    <button onClick={SendcarddatatoApp}> View More</button>
    </div>
);

  
  

    
}
export default Card;