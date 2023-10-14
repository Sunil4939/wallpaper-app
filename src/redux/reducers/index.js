import {combineReducers} from 'redux';
import auth from './auth';
import home from './home';
import category from './category';
import cart from './cart';
import address from './address';
import product from './product';
import review from './review';
import wishlist from './wishlist';
import order from './order';
import coupon from './coupon';
import brand from './brand';
import testimonial from './testimonial';
import notification from './notification';
import affiliate from './affiliate';
import contact from './contact';

export default combineReducers({
  auth,
  home,
  category,
  cart,
  address,
  product,
  review,
  wishlist,
  order,
  coupon,
  brand,
  testimonial,
  notification,
  affiliate,
  contact,
});
