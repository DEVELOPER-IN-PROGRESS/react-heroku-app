import React from "react";
import { connect } from 'react-redux' ;
import { createStructuredSelector } from "reselect";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component' ; 

import { 
    selectCartItems , 
    selectCartTotal}  from '../../redux/cart/cart.selectors' ;

import './checkout.styles.scss' ; 

const CheckoutPage = ( {cartItems , total} ) => (
   <div className="checkout-page">
        <div className="checkout-header">
             <div className="header-block">
                 <span>Product</span>
             </div>
             <div className="header-block">
                 <span>Description</span>
             </div>
             <div className="header-block">
                 <span>Quantity</span>
             </div>
             <div className="header-block">
                 <span>Price</span>
             </div>
             <div className="header-block">
                 <span>Remove</span>
             </div>
        </div>
        {
            cartItems.map(cartItem => (  
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />         
          ) )
        }
        <div className="total">
            <span>total: $ {total}</span>            
        </div>
        <div className='test-warning'>
            *Please use the following test-credit card for payments
            <br />
            4000056655665556 - Exp 01/25 - CVV : 123 
            <br />
            // Please refer the stripe documentation url in case of any payment error <a href='https://stripe.com/docs/testing#cards'>here</a> 
        </div>
        <StripeCheckoutButton price={total} />

   </div>
) 

const mapStateToProps = createStructuredSelector ({
    cartItems : selectCartItems ,
    total : selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage) ; 