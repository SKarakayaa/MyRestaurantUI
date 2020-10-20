import React from 'react';
import OrderCard from '../common/OrderCard';
import * as userActions from "../../redux/actions/userAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
class Orders extends React.Component {
	componentDidMount() {
		if (this.props.orders.length === 0) {
		  this.props.actions.getUserOrders(1,99999);
		}
	}	
	render() {
    	return (
    		<>
    		    <div className='p-4 bg-white shadow-sm'>
	              <h4 className="font-weight-bold mt-0 mb-4">Past Orders</h4>
				  {this.props.orders.map(orders=>(	
					   
			      <OrderCard
			      //	image='/img/3.jpg'
			      	imageAlt=''			      	 
			      	orderDate={orders.order_date}
			      	deliveredDate={orders.send_date}
			      	orderTitle={orders.order_number}
			      	address={orders.order_address}
			      	orderProducts='Ürün Listesi detail olarak sorgulanacak'
			      	orderTotal={orders.total_price}
			      	helpLink='#'
			      	detailLink='/detail' 
			      />
				 
				  ))}
			 
			    </div>
		    </>
    	);
    }
}

function mapStateToProps(state) {
	return {
		orders: state.userOrdersReducer,
	};
  }
  function mapDispatchToProps(dispatch) {
	return {
	  actions: {		 
		getUserOrders: bindActionCreators(
		  userActions.getUserOrders,
		  dispatch
		),
	  },
	};
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Orders);
 
 