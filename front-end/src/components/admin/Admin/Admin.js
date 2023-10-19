import Column from '../Column/Column';
import AdminIssueOverlay from '../AdminIssueOverlay/AdminIssueOverlay';
import { useState } from 'react';
import '../Column/Column.css';
import '../AdminIssueOverlay/AdminIssueOverlay.css';
import './Admin.css';

const notStartedCards = [
{
  userName: "Tauke",
   title: "Hello World",
   issueDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
   tags: ['ResEd', 'StudentGov']
},
{
  userName: "Tauke1",
  title: "Laundry issue1",
  issueDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  tags: ['ResEd', 'StudentGov1']
},
{
  userName: "Tauke2",
  title: "Laundry issue2",
  issueDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  tags: ['ResEd', 'StudentGov2']
}
];
const inProgressCards = [
  {
    userName: "Tauke3",
     title: "Laundry issue3",
     issueDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
     tags: ['ResEd', 'StudentGov3']
  },
  {
    userName: "Tauke4",
    title: "Laundry issue4",
    issueDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    tags: ['ResEd', 'StudentGov4']
  }
  ];
const awaitingResponseCards = [
    {
      userName: "Tauke5",
      title: "Laundry issue5",
      issueDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      tags: ['ResEd', 'StudentGov5']
    }
];
const resolvedCards = [
  {
    userName: "Tauke6",
    title: "Laundry issue6",
    issueDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    tags: ['ResEd', 'StudentGov6']
  },
  {
    userName: "Tauke7",
    title: "Laundry issue7",
    issueDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    tags: ['ResEd', 'StudentGov7']
  },
  {
    userName: "Tauke8",
    title: "Laundry issue8",
    issueDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    tags: ['ResEd', 'StudentGov8']
  },
  {
    userName: "Tauke9",
    title: "Laundry issue9",
    issueDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    tags: ['ResEd', 'StudentGov9']
  }
];

function Admin() {
  // The active card to show the overlay about
  const [activeCard, setActiveCard] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);

  const openOverlay = (card) => {
    setShowOverlay(true);
    setActiveCard(card);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

if (showOverlay) {
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
} else {
    return (
      <div className="App">
      <div className="body-container">
        <Column onOpen ={openOverlay} name ="Not Started" cards ={notStartedCards}/>
        <Column onOpen ={openOverlay} name ="In Progress" cards ={inProgressCards}/>
        <Column onOpen ={openOverlay} name ="Awaiting Response" cards ={awaitingResponseCards}/>
        <Column onOpen ={openOverlay} name ="Resolved" cards ={resolvedCards}/>
      </div>
    </div>
    );
}
}

export default Admin;
