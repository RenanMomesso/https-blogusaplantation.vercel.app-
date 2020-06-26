import { useState } from "react";
import Link from "next/link";
import { emailContactForm } from "../../actions/form";

const ContactForm = (props) => {
    const {authorEmail} = props
  const [values, setValues] = useState({
    message: "",
    name: "",
    email: "",
    sent: false,
    buttonText: "Send message",
    success: false,
    error: false,
  });

  const { buttonText, email, error, message, name, sent, success } = values;

  const clicksubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Sending..." });
    emailContactForm({authorEmail,name , email, message }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          sent: true,
          name: "",
          email: "",
          message: "",
          buttonText: "Sent",
          success: data.success,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      sucess: false,
      buttonText: "Send message",
    });
  };
  const showSuccessMessage = () =>
    success && (
      <div className="alert alert-info">Thank you for contacting us.</div>
    );

  const showErrorMessage = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const contactForm = () => {
    return (
      <form onSubmit={clicksubmit} className="pb-5">
        <div className="form-group">
          <label className="lead">Message</label>
          <textarea
            onChange={handleChange("message")}
            type="text"
            className="form-control"
            value={message}
            required
            rows="10"
          ></textarea>
        </div>

        <div className="form-group">
          <label className="lead">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            className="form-control"
            value={name}
            required
          />
        </div>

        <div className="form-group">
          <label className="lead">Email</label>
          <input
            type="email"
            onChange={handleChange("email")}
            className="form-control"
            value={email}
            required
          />
        </div>
        <div>
          <button className="btn btn-primary">{buttonText}</button>
        </div>
      </form>
    );
  };

  return (
    <>
      {showSuccessMessage()}
      {showErrorMessage()}
      {contactForm()}
    </>
  );
};

export default ContactForm;
