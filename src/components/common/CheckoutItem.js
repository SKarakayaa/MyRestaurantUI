import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Icofont from 'react-icofont';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../redux/actions/cartActions';

class CheckoutItem extends Component {
 constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.qty || 1,
      show: this.props.show || true,
      max:this.props.maxValue || 5,
      min:this.props.minValue || 0
    };
  }

  IncrementItem = (product) => {
    this.props.actions.addToCart({quantity:1,product})
  }
  DecreaseItem = (product) => {
    this.props.actions.removeFromCart(product)
  }
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  }

  render() {
    const {product,quantity} = this.props;
    return (
    	<div className="gold-members p-2 border-bottom">
           
           <span className="count-number float-right">
               <Button variant="outline-secondary" onClick={()=>this.DecreaseItem(product)} className="btn-sm left dec"> <Icofont icon="minus" /> </Button>
               <input className="count-number-input" type="text" value={quantity} readOnly/>
               <Button variant="outline-secondary" onClick={()=>this.IncrementItem(product)} className="btn-sm right inc"> <Icofont icon="icofont-plus" /> </Button>
           </span>
           <p className="text-gray mb-0 float-right ml-2">{this.props.priceUnit} {this.props.price * this.props.quantity}</p>
           <div className="media">
              <div className="mr-2"><Icofont icon="ui-press" className="text-danger food-item" /></div>
              <div className="media-body">
                 <p className="mt-1 mb-0 text-black">{this.props.itemName}</p>
              </div>
           </div>
        </div>
    );
  }
}

CheckoutItem.defaultProps = {
  show: true,
  priceUnit:'$'
}
function mapDispatchToProps(dispatch){
  return{
    actions:{
      addToCart:bindActionCreators(cartActions.addToCart,dispatch),
      removeFromCart:bindActionCreators(cartActions.removeFromCart,dispatch),
    }
  }
}
export default connect(null,mapDispatchToProps)(CheckoutItem);