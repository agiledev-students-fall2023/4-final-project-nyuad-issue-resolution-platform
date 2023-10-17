/* eslint-disable */

import logo from './logo.svg';
import Header from './Header';
import Column from './Column';
import Card from './Card.mjs';
import AdminIssueOverlay from './AdminIssueOverlay';
import { useState } from 'react';
import './Admin.css'



const Notstartedcards = [
{
   username : "Tauke",
   title : "Hello World",
   issuedescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit",
   tags : ['ResEd','StudentGov']
},
{
  username : "Tauke1",
  title : "Laundry issue1",
  issuedescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  tags : ['ResEd','StudentGov1']
},
{
  username : "Tauke2",
  title : "Laundry issue2",
  issuedescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  tags : ['ResEd','StudentGov2']
}
]
const InProgresscards= [
  {
     username : "Tauke3",
     title : "Laundry issue3",
     issuedescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
     tags : ['ResEd','StudentGov3']
  },
  {
    username : "Tauke4",
    title : "Laundry issue4",
    issuedescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    tags : ['ResEd','StudentGov4']
  },
  ]
const Awaitingresponsecards= [
    {
      username : "Tauke5",
      title : "Laundry issue5",
      issuedescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      tags : ['ResEd','StudentGov5']
    }
]
const Resolvedcards= [
  {
    username : "Tauke6",
    title : "Laundry issue6",
    issuedescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    tags : ['ResEd','StudentGov6']
  },
  {
    username : "Tauke7",
    title : "Laundry issue7",
    issuedescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    tags : ['ResEd','StudentGov7']
  },
  {
    username : "Tauke8",
    title : "Laundry issue8",
    issuedescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    tags : ['ResEd','StudentGov8']
  },
  {
    username : "Tauke9",
    title : "Laundry issue9",
    issuedescription : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    tags : ['ResEd','StudentGov9']
  },
]

  
function Admin() {
 
  //The active card to show the overlay about
  const [activeCard , setActiveCard] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);

  const openOverlay = (card) => {
    setShowOverlay(true);
    setActiveCard(card)
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };


if(showOverlay)
{
  return (
  <div>
    <button onClick={openOverlay}>Open Overlay</button>
    {showOverlay && (
      <AdminIssueOverlay onClose={closeOverlay} card = {activeCard}>
        <h2>This is the overlay content</h2>
        <p>You can add any content here.</p>
      </AdminIssueOverlay>
    )}
  </div>);
}
else
{
    return(
      <div className="App">
      <div className="bodycontainer">
        <Column onOpen ={openOverlay} name ="Not Started" cards ={Notstartedcards}/>
        <Column onOpen ={openOverlay} name ="In Progress" cards ={InProgresscards}/>
        <Column onOpen ={openOverlay} name ="Awaiting Response" cards ={Awaitingresponsecards}/>
        <Column onOpen ={openOverlay} name ="Resolved" cards ={Resolvedcards}/>
      </div>
    </div>
    );
}
  
}

export default Admin;
