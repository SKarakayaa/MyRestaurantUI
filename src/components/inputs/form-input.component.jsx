import { Form } from "react-bootstrap";
import React from "react";

const FormInput = ({
  handleChange,
  placeholder,
  type,
  labelText,
  name,
  value,
}) => (
  <div className="form-label-group">
    <Form.Control
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
    <Form.Label htmlFor={name}>{labelText}</Form.Label>
  </div>
);
export default FormInput;
