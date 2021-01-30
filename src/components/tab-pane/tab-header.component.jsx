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
            <Translate lang="tr">Order Online</Translate>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">
            <Translate lang="tr">Gallery</Translate>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="third">
            <Translate lang="tr">Restaurant Info</Translate>{" "}
          </Nav.Link>
        </Nav.Item>
        {AuthHelper.IsLogin() && (
          <Nav.Item>
            <Nav.Link eventKey="fourth">
              <Translate lang="tr">Rezervation</Translate>
            </Nav.Link>
          </Nav.Item>
        )}
        <Nav.Item>
          <Nav.Link eventKey="fifth">
            <Translate lang="tr">Ratings & Reviews</Translate>{" "}
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
  </Row>
);
export default TabHeader;
