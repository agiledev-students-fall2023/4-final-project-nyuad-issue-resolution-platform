import Card from "./Card.mjs";
import React from 'react';



const Column = ({onOpen ,name , cards}) =>
{
    return (
        <div className="column">
            <div className="columntitle">
                <h2> {name} </h2>   
            </div>
            <div className="columncontainer">
                {
                cards.map(card => 
                    <Card onOpen = {onOpen} props = {card}/> 
                )
                }
            </div>
         
        </div>
      );
}
 
export default Column;