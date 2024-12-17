import React from "react";

const BackButton = () => {
  const handleBack = (event) => {
    event.preventDefault();
    window.history.back();
  };

  return (
    <button
      className="btn_back"
      type="button"
      onClick={(event) => handleBack(event)}
    >
      Back
    </button>
  );
};

export default BackButton;
