import React from 'react';
import {Row,Col} from 'react-bootstrap';
import PaymentCard from '../common/PaymentCard';
import DeleteAddressModal from '../modals/DeleteAddressModal';
import * as userActions from "../../redux/actions/userAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Payments extends React.Component {

	componentDidMount() {
		if (this.props.cards.length === 0) {
		  this.props.actions.getUserCards(1,99999);
		}
	}	
	constructor(props, context) {
	    super(props, context);

	    this.state = {
	      showDeleteModal: false,
	    };
	}

    hideDeleteModal = () => this.setState({ showDeleteModal: false });
	render() {
    	return (
    		<>
        		<DeleteAddressModal show={this.state.showDeleteModal} onHide={this.hideDeleteModal}/>
    		    <div className='p-4 bg-white shadow-sm'>
	              <Row>
	               <Col md={12}>
	                  <h4 className="font-weight-bold mt-0 mb-3">Payments</h4>
	               </Col>
				   {this.props.cards.map(cards=>(					 
					 <Col md={6}  key={cards.frm_user_card_id}>
	               
	               	<PaymentCard 
	               		title=  {cards.card_no.substring(3,7)+"-XXXX-XXXX-"+cards.card_no.substring(12,16)}
						logoImage= 'img/bank/1.png'
						imageclassName= 'mr-3'
						//subTitle= 'VALID TILL' {cards.card_mounth} 
						subTitle= {cards.card_mounth +" / " +cards.card_year}
						onClick={() => this.setState({ showDeleteModal: true })}
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
		cards: state.userCardsReducer,
	};
  }
  function mapDispatchToProps(dispatch) {
	return {
	  actions: {		 
		getUserCards: bindActionCreators(
		  userActions.getUserCards,
		  dispatch
		),
	  },
	};
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Payments);
 
 