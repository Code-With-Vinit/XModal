import React, { useState, useRef, useEffect } from "react";

const XModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    if (!username.trim()) {
      alert("Please fill out the Username field.");
      return;
    }
    if (!email.trim()) {
      alert("Please fill out the Email field.");
      return;
    }
    if (!phone.trim()) {
      alert("Please fill out the Phone Number field.");
      return;
    }
    if (!dob.trim()) {
      alert("Please fill out the Date of Birth field.");
      return;
    }

    if (!email.includes("@")) {
      alert(`Please include an '@' in the email address. ${email} is missing an '@'.`);
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const today = new Date();
    const selectedDate = new Date(dob);
    if (selectedDate > today) {
      alert("Invalid date of birth. Please enter a valid date.");
      return;
    }

    // All validations passed, close modal and reset form
    setFormData({
      username: "",
      email: "",
      phone: "",
      dob: "",
    });
    setShowModal(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <h1>User Details Modal</h1>
      <button style={{display:"block"}} onClick={() => setShowModal(true)}>Open Form</button>

      {showModal && (
        <div className="modal" style={overlayStyles}>
          <div
            className="modal-content"
            ref={modalRef}
            style={modalStyles}
          >
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;

// CSS styles (inline for now)
const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalStyles = {
  backgroundColor: "white",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  maxWidth: "300px",
  width: "100%",
};
