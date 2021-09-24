import React from 'react' ;
import StripeCheckout from 'react-stripe-checkout' ;

const StripeCheckoutButton = ({ price }) => {

  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_WBqax2FWVzS9QlpJScO07iuL';

  const onToken = token => {
      console.log(token);
      alert('Payment Successful');
  }

  return (
      <StripeCheckout 
        label='Pay Now'
        name='React Store Ltd'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your Total Price is $${price}`}
        amount={priceForStripe}
        panelLabel = 'Pay Now'
        token={onToken}
        stripeKey={publishableKey}
       />
  )
}

export default StripeCheckoutButton ; 