import BaseSelect from "react-select";
import FixComponent from "./select.component";
import { Form } from "react-bootstrap";
import React from "react";

const SingleSelect = (props) => (
  <Form.Group>
    <Form.Label>{props.label}</Form.Label>
    <FixComponent
      {...props}
      SelectComponent={BaseSelect}
      options={props.options}
    />
  </Form.Group>
);
export default SingleSelect;
