import { Accordion, Button, Form } from "react-bootstrap";
import {
  selectCuisinies,
  selectDestinies,
  selectOrderTimes,
} from "../../redux/main/main.reselect";

import Icofont from "react-icofont";
import MainPagesHelper from "../../helpers/mainPagesHelper";
import React from "react";
import Select2 from "react-select2-wrapper";
import Translate from '../../utilities/translator';
import {TranslatePlaceholder} from '../../utilities/translator-placeholder';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAreAreasFetching } from "../../redux/address/address.reselect";
import { selectAreas } from "../../redux/address/address.reselect";
import { selectChoosedAddress } from "../../redux/order/order.reselect";

const Sidebar = ({
  areas,
  cuisines,
  destinies,
  orderTimes,
  areaId,
  destinyId,
  orderTime,
  checkedCuisines,
  areAreasFetching,
  choosedAddress,
  HandleChange,
}) => (
  <div>
    <div className="filters shadow-sm rounded bg-white mb-4">
      <div className="filters-header border-bottom pl-4 pr-4 pt-3 pb-3">
        <h5 className="m-0"><Translate>Filter By</Translate></h5>
      </div>
      <div className="filters-body">
        <Accordion defaultActiveKey="0">
          {choosedAddress === null && !areAreasFetching && (
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
                    <Translate>Area</Translate> <Icofont icon="arrow-down" className="ml-auto" />
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
                      placeholder: TranslatePlaceholder("Choose Area"),
                    }}
                  />
                </div>
              </Accordion.Collapse>
            </div>
          )}

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
                  <Translate>All cuisines</Translate> <Icofont icon="arrow-down" className="ml-auto" />
                </Accordion.Toggle>
              </h6>
            </div>

            <Accordion.Collapse eventKey="1">
              <div className="filters-card-body card-shop-filters">
                {/* <form className="filters-search mb-3">
                  <Form.Group>
                    <Icofont icon="search" />
                    <Form.Control
                      type="text"
                      placeholder="Start typing to search..."
                    />
                  </Form.Group>
                </form> */}
                {cuisines.map((cuisine) => (
                  <Form.Check
                    custom
                    type="checkbox"
                    name="cuisine"
                    value={cuisine.all_cuisines_id}
                    key={cuisine.all_cuisines_id}
                    onChange={HandleChange}
                    checked={checkedCuisines.includes(cuisine.all_cuisines_id)}
                    id={cuisine.all_cuisines_id}
                    label={<React.Fragment>{cuisine.name}</React.Fragment>}
                  />
                ))}
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
                  <Translate>Destiny</Translate> <Icofont icon="arrow-down" className="ml-auto" />
                </Accordion.Toggle>
              </h6>
            </div>
            <Accordion.Collapse eventKey="2">
              <div className="filters-card-body card-shop-filters">
                {destinies.map((destiny) => (
                  <Form.Check
                    custom
                    type="checkbox"
                    name="destiny"
                    value={destiny.id}
                    key={destiny.id}
                    onChange={HandleChange}
                    checked={destiny.id === destinyId}
                    id={destiny.name}
                    label={<React.Fragment>{destiny.name}</React.Fragment>}
                  />
                ))}
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
                  <Translate>Delivery time</Translate>{" "}
                  <Icofont icon="arrow-down" className="ml-auto" />
                </Accordion.Toggle>
              </h6>
            </div>
            <Accordion.Collapse eventKey="3">
              <div className="filters-card-body card-shop-filters">
                {orderTimes.map((time, index) => (
                  <Form.Check
                    custom
                    type="checkbox"
                    name="orderTime"
                    key={index}
                    onChange={HandleChange}
                    checked={orderTime === time.time}
                    value={time.time}
                    id={time.time}
                    label={time.time + TranslatePlaceholder(" Minutes")}
                  />
                ))}
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
  cuisines: selectCuisinies,
  destinies: selectDestinies,
  orderTimes: selectOrderTimes,
  choosedAddress: selectChoosedAddress,
  areAreasFetching: selectAreAreasFetching,
});
export default connect(mapStateToProps)(Sidebar);
