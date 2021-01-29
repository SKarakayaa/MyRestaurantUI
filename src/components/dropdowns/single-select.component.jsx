import { Form } from "react-bootstrap";
import React from "react";

const SingleSelect = (props) => (
  <Form.Group>
    <Form.Label>{props.label}</Form.Label>
    <Form.Control as="select" {...props} onChange={props.onChange}>
      <option value="">Seçiniz</option>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
);
export default SingleSelect;
