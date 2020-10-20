import React from 'react';
import {Row,Col,Button,Spinner} from 'react-bootstrap';
import CardItem from '../common/CardItem';
import * as userActions from "../../redux/actions/userAction";
import * as productActions from "../../redux/actions/productActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

 
class Favourites extends React.Component {
	componentDidMount() {
		debugger;
		if (this.props.products.length === 0) {
			this.props.actions.getProducts(1);
		}
		if (this.props.favoritesProducts.length === 0) {
		  this.props.actions.getUserFavoritesProducts(1,99999);
		}
		
	}	
	getProduct=(product_id)=>{
		console.log("products :",this.props.products);
		debugger;
		var product=this.props.products.find(p=> p.frm_product_id === product_id) === undefined ? "-" : this.props.products.find(p=> p.frm_product_id === product_id);
		return product;
	}
	render() {
    	return (
    		<>
    		    <div className='p-4 bg-white shadow-sm'>
	              <Row>
	                 <Col md={12}>
	                    <h4 className="font-weight-bold mt-0 mb-3">Favourites</h4>
	                 </Col>
					 {this.props.favoritesProducts.map(favoritesProduct=>(
					 <Col md={4}  key={favoritesProduct.frm_user_product_favorites_id}>
	                    <CardItem 
					   		title= {this.getProduct(favoritesProduct.product_id).name}// { favoritesProducts.product_id} //'Bite Me Sandwiches'
							subTitle={this.getProduct(favoritesProduct.product_id).description}
						  	imageAlt='Product'
						    image='img/list/1.png'
						    imageClass='img-fluid item-img'
						    linkUrl='detail'						    
						    offerColor='danger'
							time={this.getProduct(favoritesProduct.product_id).prepation_time}
							price={this.getProduct(favoritesProduct.product_id).price}
							showPromoted={true}
							promotedVariant='dark'
							favIcoIconColor='text-danger'
							rating='3.1 (300+)'
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
		favoritesProducts: state.userFavoritesProductsReducer,
		products: state.productReducer,
	};
  }
  function mapDispatchToProps(dispatch) {
	return {
	  actions: {		 
		getUserFavoritesProducts: bindActionCreators(
		  userActions.getUserFavoritesProducts,
		  dispatch
		),
		getProducts: bindActionCreators(productActions.getProducts, dispatch),
	  },
	};
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
 
 