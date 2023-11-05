import './UpdatesBox.css';
function UpdatesBox({ name, index, description }) {
  return (
      <div className="admin-update-box">
      <h3>{name} {index}</h3>
        <p>{description}</p>
      </div>
  );
}
export default UpdatesBox;
