import './UpdatesBox.css';
function UpdatesBox({ index, description }) {
  return (
      <div className="update-box">
      <h3>Update 1{index}</h3>
        <p>{description}</p>
      </div>
  );
}
export default UpdatesBox;
