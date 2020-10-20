import React from 'react';
import {Row,Col} from 'react-bootstrap';
import CouponCard from '../common/CouponCard';
import * as userActions from "../../redux/actions/userAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
class Offers extends React.Component {

	componentDidMount() {
		if (this.props.offers.length === 0) {
		  this.props.actions.getUserOffers(1,99999);
		}
	}	

	render() {
		console.log("populars : ",this.props.offers);
    	return (
    		<>
    		    <div className='p-4 bg-white shadow-sm'>
	              <Row>
	               <Col md={12}>
	                  <h4 className="font-weight-bold mt-0 mb-3">Offers</h4>
	               </Col>
				   {this.props.offers.map(offers=>(					 
					 <Col md={6}  key={offers.frm_offers_id}>
	               	  <CouponCard 
						  title= {offers.title}
						  subTitle= {offers.description}
						  copyBtnText= 'COPY CODE'
						  couponCode= {offers.offers_code}
						  noBorder={false}
	               	  />
	               </Col>
				   ))}
	            </Row>
			    </div>
		    </>
    	);
    }
}

function mapStateToProps(state) {
	return {
		offers: state.userOffersReducer,
	};
  }
  function mapDispatchToProps(dispatch) {
	return {
	  actions: {		 
		getUserOffers: bindActionCreators(
		  userActions.getUserOffers,
		  dispatch
		),
	  },
	};
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Offers);
 