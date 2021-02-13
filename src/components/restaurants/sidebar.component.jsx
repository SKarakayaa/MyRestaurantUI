import { Accordion, Button, Form } from "react-bootstrap";

import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import MainPagesHelper from "../../helpers/mainPagesHelper";
import React from "react";
import Select2 from "react-select2-wrapper";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAreas } from "../../redux/address/address.reselect";

const Sidebar = ({ areas, areaId, HandleChange }) => (
  <div>
    <div className="filters shadow-sm rounded bg-white mb-4">
      <div className="filters-header border-bottom pl-4 pr-4 pt-3 pb-3">
        <h5 className="m-0">Filter By</h5>
      </div>
      <div className="filters-body">
        
        <Accordion defaultActiveKey="0">
          <div className="filters-card border-bottom p-4">
            <div className="filters-card-header" id="headingOne">
              <h6 className="mb-0">
                <Accordion.Toggle
                  as={Button}
                  size="block"
                  variant="link"
                  className="text-left d-flex align-items-center p-0"
                  eventKey="0"
                >
                  Area <Icofont icon="arrow-down" className="ml-auto" />
                </Accordion.Toggle>
              </h6>
            </div>
            <Accordion.Collapse eventKey="0">
              <div className="filters-card-body card-shop-filters">
                <Select2
                  className="form-control"
                  data={MainPagesHelper.FormatCities(areas)}
                  name="areaId"
                  value={areaId}
                  onChange={HandleChange}
                  options={{
                    placeholder: "Choose Area",
                  }}
                />
              </div>
            </Accordion.Collapse>
          </div>

          <div className="filters-card border-bottom p-4">
            <div className="filters-card-header" id="headingTwo">
              <h6 className="mb-0">
                <Accordion.Toggle
                  as={Button}
                  size="block"
                  variant="link"
                  className="text-left d-flex align-items-center p-0"
                  eventKey="1"
                >
                  All cuisines <Icofont icon="arrow-down" className="ml-auto" />
                </Accordion.Toggle>
              </h6>
            </div>

            <Accordion.Collapse eventKey="1">
              <div className="filters-card-body card-shop-filters">
                <form className="filters-search mb-3">
                  <Form.Group>
                    <Icofont icon="search" />
                    <Form.Control
                      type="text"
                      placeholder="Start typing to search..."
                    />
                  </Form.Group>
                </form>
                <Form.Check
                  custom
                  type="checkbox"
                  defaultChecked={true}
                  id="custom-cb6"
                  label={
                    <React.Fragment>
                      American <small className="text-black-50">156</small>
                    </React.Fragment>
                  }
                />

                <Form.Check
                  custom
                  type="checkbox"
                  id="custom-cb7"
                  label={
                    <React.Fragment>
                      Pizza <small className="text-black-50">120</small>
                    </React.Fragment>
                  }
                />

                <Form.Check
                  custom
                  type="checkbox"
                  id="custom-cb8"
                  label={
                    <React.Fragment>
                      Healthy <small className="text-black-50">130</small>
                    </React.Fragment>
                  }
                />

                <Form.Check
                  custom
                  type="checkbox"
                  id="custom-cb9"
                  label={
                    <React.Fragment>
                      Vegetarian <small className="text-black-50">120</small>
                    </React.Fragment>
                  }
                />

                <Form.Check
                  custom
                  type="checkbox"
                  id="custom-cb10"
                  label={
                    <React.Fragment>
                      Chinese <small className="text-black-50">111</small>
                    </React.Fragment>
                  }
                />

                <Form.Check
                  custom
                  type="checkbox"
                  id="custom-cb11"
                  label={
                    <React.Fragment>
                      Hamburgers <small className="text-black-50">95</small>
                    </React.Fragment>
                  }
                />

                <Form.Check
                  custom
                  type="checkbox"
                  id="custom-cb12"
                  label={
                    <React.Fragment>
                      Dessert <small className="text-black-50">50</small>
                    </React.Fragment>
                  }
                />

                <Form.Check
                  custom
                  type="checkbox"
                  id="custom-cb13"
                  label={
                    <React.Fragment>
                      Chicken <small className="text-black-50">32</small>
                    </React.Fragment>
                  }
                />

                <Form.Check
                  custom
                  type="checkbox"
                  id="custom-cb14"
                  label={
                    <React.Fragment>
                      Indian <small className="text-black-50">156</small>
                    </React.Fragment>
                  }
                />
                <div className="mt-2">
                  <Link to="#" className="link">
                    See all
                  </Link>
                </div>
              </div>
            </Accordion.Collapse>
          </div>
          <div className="filters-card border-bottom p-4">
            <div className="filters-card-header" id="headingOne">
              <h6 className="mb-0">
                <Accordion.Toggle
                  as={Button}
                  size="block"
                  variant="link"
                  className="text-left d-flex align-items-center p-0"
                  eventKey="2"
                >
                  Feature <Icofont icon="arrow-down" className="ml-auto" />
                </Accordion.Toggle>
              </h6>
            </div>
            <Accordion.Collapse eventKey="2">
              <div className="filters-card-body card-shop-filters">
                <Form.Check
                  custom
                  type="checkbox"
                  defaultChecked={true}
                  id="custom-cb15"
                  label={
                    <React.Fragment>
                      Free Delivery <small className="text-black-50">156</small>
                    </React.Fragment>
                  }
                />

                <Form.Check
                  custom
                  type="checkbox"
                  id="custom-cb16"
                  label={
                    <React.Fragment>
                      Coupons <small className="text-black-50">120</small>
                    </React.Fragment>
                  }
                />

                <Form.Check
                  custom
                  type="checkbox"
                  id="custom-cb17"
                  label={
                    <React.Fragment>
                      Open Now [1:31am]{" "}
                      <small className="text-black-50">85</small>
                    </React.Fragment>
                  }
                />
              </div>
            </Accordion.Collapse>
          </div>
          <div className="filters-card border-bottom p-4">
            <div className="filters-card-header" id="headingOne">
              <h6 className="mb-0">
                <Accordion.Toggle
                  as={Button}
                  size="block"
                  variant="link"
                  className="text-left d-flex align-items-center p-0"
                  eventKey="3"
                >
                  Delivery time{" "}
                  <Icofont icon="arrow-down" className="ml-auto" />
                </Accordion.Toggle>
              </h6>
            </div>
            <Accordion.Collapse eventKey="3">
              <div className="filters-card-body card-shop-filters">
                <Form.Check
                  custom
                  type="checkbox"
                  defaultChecked={true}
                  id="custom-cb18"
                  label="Any Time"
                />

                <Form.Check
                  custom
                  type="checkbox"
                  id="custom-cb19"
                  label="25 min"
                />

                <Form.Check
                  custom
                  type="checkbox"
                  id="custom-cb20"
                  label="30 min"
                />

                <Form.Check
                  custom
                  type="checkbox"
                  id="custom-cb21"
                  label="40 min"
                />

                <Form.Check
                  custom
                  type="checkbox"
                  id="custom-cb22"
                  label="45 min"
                />
                <div className="mt-2">
                  <Link to="#" className="link">
                    See all
                  </Link>
                </div>
              </div>
            </Accordion.Collapse>
          </div>
        </Accordion>
      </div>
    </div>
  </div>
);
const mapStateToProps = createStructuredSelector({
  areas: selectAreas,
});
export default connect(mapStateToProps)(Sidebar);
