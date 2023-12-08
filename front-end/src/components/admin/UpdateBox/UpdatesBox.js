import './UpdatesBox.css';
function UpdatesBox({ name, index, description }) {
  return (
      <div className="admin-update-box">
      <h4> {name} {index}</h4>
        <p>{description}</p>
      </div>
  );
}
export default UpdatesBox;
