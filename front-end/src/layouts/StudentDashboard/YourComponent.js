import { useState } from "react";
import CreateRequest from "./CreateRequest"; // Assuming CreateRequest is the component

const YourComponent = () => {
  const [showCreateRequest, setShowCreateRequest] = useState(false);

  const toggleCreateRequest = () => {
    setShowCreateRequest(!showCreateRequest);
  };

  return (
    <div className="create-request-button">
      <button className="button-student-dashboard" onClick={toggleCreateRequest}>
        Create Request +
      </button>

      {showCreateRequest && <CreateRequest />} {/* Render CreateRequest when showCreateRequest is true */}
    </div>
  );
};

export default YourComponent;
