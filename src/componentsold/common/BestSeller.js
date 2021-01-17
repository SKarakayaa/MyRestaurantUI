import * as cartActions from "../../redux/actions/cartActions";
import * as userActions from "../../redux/actions/userActions";

import { Badge, Button, Image } from "react-bootstrap";

import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import MenuModal from "./MenuModal";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import history from "../history";

class BestSeller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.qty || 0,
      show: this.props.show || true,
      max: this.props.maxValue || 5,
      min: this.props.minValue || 0,

      modalShow: false,
    };
  }

  IncrementItem = (product) => {
    this.addToCart(product);
  };
  DecreaseItem = (product) => {
    this.props.actions.removeFromCart(product);
  };
  AddToCart = (product) => {
    if (product.product_materials !== "") {
      this.openModal();
    } else {
      this.props.actions.addToCart({ quantity: 1, product });
    }
  };

  // reselect - quantity kullanılıyor sadece
  isInCart = () => {
    const productId = this.props.product.frm_product_id;
    const item = this.props.cart.find(
      (cartItem) => cartItem.product.id === productId
    );
    return item;
  };
  addFavorite = (productid) => {
    const { currentUser } = this.props;
    if (Object.keys(currentUser).length === 0) {
      history.push("/login");
    } else {
      const { favoriteProducts } = this.props;
      var isFavorite = favoriteProducts.find((x) => x.product_id === productid);
      if (isFavorite === undefined) {
        this.props.actions.addFavorite(currentUser.session.userId, productid);
      } else {
        this.props.actions.deleteFavorite(
          isFavorite.frm_user_product_favorites_id
        );
      }
    }
  };
  GetHearthIconColor = (productid) => {
    const { favoriteProducts } = this.props;
    var isFavorite = favoriteProducts.find((x) => x.product_id === productid);
    if (isFavorite !== undefined) {
      return "favourite-heart position-absolute text-danger";
    } else {
      return "favourite-heart position-absolute text-secondary";
    }
  };
  openModal = () => this.setState({ modalShow: true });
  hideModal = () => this.setState({ modalShow: false });
  render() {
    const { product } = this.props;
    const isInCart = this.isInCart();
    return (
      <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
        {this.state.modalShow ? (
          <MenuModal
            show={this.state.modalShow}
            onHide={this.hideModal}
            menu={product}
          />
        ) : (
          ""
        )}
        <div className="list-card-image">
          {this.props.rating ? (
            <div className="star position-absolute">
              <Badge variant="success">
                <Icofont icon="star" /> {this.props.rating}
              </Badge>
            </div>
          ) : (
            ""
          )}
          <div className={this.GetHearthIconColor(product.frm_product_id)}>
            <Link
              onClick={() => this.addFavorite(product.frm_product_id)}
              to="#"
            >
              <Icofont icon="heart" />
            </Link>
          </div>
          {this.props.showPromoted ? (
            <div className="member-plan position-absolute">
              <Badge variant={this.props.promotedVariant}>Promoted</Badge>
            </div>
          ) : (
            ""
          )}
          <Link to="#">
            <Image
              src={this.props.image}
              className={this.props.imageClass}
              alt={this.props.imageAlt}
            />
          </Link>
        </div>
        <div className="p-3 position-relative">
          <div className="list-card-body">
            <h6 className="mb-1">
              <Link to="#" className="text-black">
                {this.props.title}
              </Link>
            </h6>
            {this.props.subTitle ? (
              <p className="text-gray mb-3">{this.props.subTitle}</p>
            ) : (
              ""
            )}
            {this.props.price ? (
              <p className="text-gray time mb-0">
                <Link
                  className="btn btn-link btn-sm pl-0 text-black pr-0"
                  to="#"
                >
                  {this.props.price}{" "}
                  {this.props.priceUnit}
                </Link>
                {this.props.isNew ? (
                  <Badge variant="success" className="ml-1">
                    NEW
                  </Badge>
                ) : (
                  ""
                )}

                {isInCart === undefined ? (
                  <span className="float-right">
                    <Button
                      variant="outline-secondary"
                      onClick={() => this.AddToCart(product)}
                      size="sm"
                    >
                      ADD
                    </Button>
                  </span>
                ) : (
                  <span className="count-number float-right">
                    <input
                      className="count-number-input"
                      type="text"
                      value={isInCart.quantity}
                      readOnly
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => this.AddToCart(product)}
                      className="btn-sm right inc"
                    >
                      {" "}
                      <Icofont icon="icofont-plus" />{" "}
                    </Button>
                  </span>
                )}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
BestSeller.defaultProps = {
  imageAlt: "",
  imageClass: "",
  isNew: false,
  subTitle: "",
  price: "",
  priceUnit: "$",
  showPromoted: false,
  promotedVariant: "dark",
  favIcoIconColor: "",
  rating: "",
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
      addFavorite: bindActionCreators(userActions.addFavoriteRequest, dispatch),
      deleteFavorite: bindActionCreators(
        userActions.deleteFavoriteRequest,
        dispatch
      ),
      loadFavorites: bindActionCreators(
        userActions.loadFavoritesRequest,
        dispatch
      ),
    },
  };
}
function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
    currentUser: state.currentUserReducer,
    favoriteProducts: state.favoriteProductReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(BestSeller); 
