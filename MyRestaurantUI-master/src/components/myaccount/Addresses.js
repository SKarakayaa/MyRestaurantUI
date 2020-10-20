import React from 'react';
import {Row,Col} from 'react-bootstrap';
import AddAddressModal from '../modals/AddAddressModal';
import DeleteAddressModal from '../modals/DeleteAddressModal';
import AddressCard from '../common/AddressCard';
import * as userActions from "../../redux/actions/userAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Addresses extends React.Component {
	componentDidMount() {
		if (this.props.address.length === 0) {
		  this.props.actions.getUserAddress(1,99999);
		}
	}	
	constructor(props, context) {
	    super(props, context);

	    this.state = {
	      showDeleteModal: false,
      	  showAddressModal: false,
	    };
	}

    hideDeleteModal = () => this.setState({ showDeleteModal: false });
    hideAddressModal = () => this.setState({ showAddressModal: false });

	render() {
		
    	return (
	      <>

	        <AddAddressModal show={this.state.showAddressModal} onHide={this.hideAddressModal}/>
	        <DeleteAddressModal show={this.state.showDeleteModal} onHide={this.hideDeleteModal}/>
		
    <div className='p-4 bg-white shadow-sm'>
	<Row>
	 <Col md={12}>
		<h4 className="font-weight-bold mt-0 mb-3">Manage Addresses</h4>
	 </Col>
	 {this.props.address.map(address=>(
	 <Col md={6}  key={address.frm_user_adress_id}>
		   <AddressCard 
				 boxClass="border border-primary shadow"
			title= { address.name}
			icoIcon= 'ui-home'
			iconclassName= 'icofont-3x'
			address= {address.address}
			onEditClick= {() => this.setState({ showAddressModal: true })}
			onDeleteClick={() => this.setState({ showDeleteModal: true })}
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
		address: state.userAddressReducer,
	};
  }
  function mapDispatchToProps(dispatch) {
	return {
	  actions: {		 
		getUserAddress: bindActionCreators(
		  userActions.getUserAddress,
		  dispatch
		),
	  },
	};
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Addresses);
  
 