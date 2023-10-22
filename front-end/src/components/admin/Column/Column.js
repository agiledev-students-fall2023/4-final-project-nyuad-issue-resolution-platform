import Card from '../Card/Card';
import '../Card/Card.css';

const Column = ({ onOpen, name, cards }) => {
    return (
        <div className="column">
            <div className="column-title">
                <h2> {name} </h2>
            </div>
            <div className="column-container">
                {
                    cards.map((card, index) =>
                        <Card key ={index} onOpen = {onOpen} props = {card}/>
                    )
                }
            </div>
        </div>
      );
};

export default Column;
