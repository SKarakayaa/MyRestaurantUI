import { Col, Nav, Row } from "react-bootstrap";

import AuthHelper from "../../helpers/authHelper";
import React from "react";
import Translate from "../../utilities/translator";

const TabHeader = () => (
  <Row>
    <Col md={12}>
      <Nav id="pills-tab">
        <Nav.Item>
          <Nav.Link eventKey="first">
            <Translate >Order Online</Translate>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">
            <Translate >Gallery</Translate>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="third">
            <Translate >Restaurant Info</Translate>{" "}
          </Nav.Link>
        </Nav.Item>
        {AuthHelper.IsLogin() && (
          <Nav.Item>
            <Nav.Link eventKey="fourth">
              <Translate >Rezervation</Translate>
            </Nav.Link>
          </Nav.Item>
        )}
        <Nav.Item>
          <Nav.Link eventKey="fifth">
            <Translate >Ratings & Reviews</Translate>{" "}
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
  </Row>
);
export default TabHeader;
