import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import axios from "axios";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CARD_OPTIONS } from "../../data/cardOptionsStyle";
import { SHOES_DATA } from "../../data/shoesData";
import { removeCartList } from "../../redux/user/userAction";

const API_SHOES = process.env.NEXT_PUBLIC_API_URL

// TODO: hacer bbdd pedido al concluir el pago
const StripeCheckoutForm = () => {

  const dispatch = useDispatch()
  const profile = useSelector(state => state.user)

  const [personalData, setPersonalData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      line1 : ''
    }
  })

  const handleInputChange = (event) => {
    setPersonalData({
      ...personalData,
      [event.target.name] : event.target.value
    })
  }

  const handleInputChangeAddress = (event) => {
    setPersonalData({
      ...personalData,
      address: {
        line1: event.target.value
      }  
    })
  }
  
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  /**
   * The cardElements onChange prop can be used to
   * add a handler for setting any errors.
   * @param event
   */
  const handleCardDetailsChange = event => {
      event.error ? setCheckoutError(event.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async ev => {
    ev.preventDefault();

    /* if (personalData.name === '' || personalData.email === '' || personalData.phone === '' || personalData.address.line1 === '') {
      return setCheckoutError('Rellena todos los datos')
    } */

    /**
     * We disable the form, until the stripe.js has finished
     * loading.
     */
    if (!stripe || !elements) {
      return;
    }

    const billingDetails = {
      name: 'Carlos test',
      email: 'test@test.com',
      address: {
        city: 'Pune',
        line1: 'Address 1',
        state: 'my state',
        postal_code: '2200'
      }
    };

    setProcessingTo(true);

    const cardElement = elements.getElement("card");


    try {
      const { data: clientSecret } = await axios.post(`${API_SHOES}/stripe-payment-intent`, {
        amount: profile.totalAmount
      });

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        //billing_details: personalData,
        billing_details: billingDetails
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });
      
      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

      let newOrder = SHOES_DATA
      let newOrderFilter = []

      if (profile !== undefined) {
        for (let index = 0; index < SHOES_DATA.length; index++) {
          for (let z = 0; z < profile.cartlist.length; z++) {
            if (SHOES_DATA[index].id === profile.cartlist[z].id) {
              newOrder[index].quantity = profile.cartlist[z].quantity
            }
          }
        }
        newOrderFilter = newOrder.filter(item => {
          if (item.quantity !== undefined) {
            return item
          }
        })
      }

      let itemsTotal = 0
      profile.cartlist.map(item => {
        itemsTotal += item.quantity
        return itemsTotal
      })

      let order = new Object
      order.totalAmount = profile.totalAmount
      order.totalQuantity = itemsTotal
      order.personalData = personalData
      order.date = paymentMethodReq.paymentMethod.created
      order.facture = paymentMethodReq.paymentMethod.id

      order.orderlist = newOrderFilter
      order.email = profile.email

      profile.cartlist.map(item => {
        const res = fetch(`${API_SHOES}/bestSellers`, {
          method: 'POST',
          body: JSON.stringify(item)
        }).then(res => res.json())
        .then(res => console.log(res))
      })

      const res = await fetch(`${API_SHOES}/orders`, {
        method: 'POST',
        body: JSON.stringify(order)
      })

      if (res.status === 200) {
        const response = await fetch(`${API_SHOES}/cartlist`, {
          method: 'PUT',
          body: profile.email
        })

        //quitar de la bbdd y de redux la cartlist
        dispatch(removeCartList([]))

        // proteger ruta thank you
        Router.push("/thank-you")
      } 
       
    } catch (err) {
      setCheckoutError(err.message);
    }
  };


  return (
    <div className="form-container">
      <form onSubmit={handleFormSubmit} className="form">

        <div className="form__personal-data">
          <h2 className="form__title">Address Info</h2>
          <label>Name</label>
          <input type="text" name="name" onChange={handleInputChange} />
          <label>Email</label>
          <input type="email" name="email" onChange={handleInputChange} value={profile.email} disabled />
          <label>Phone Number</label>
          <input type="text" name="phone" onChange={handleInputChange} />
          <label>Address</label>
          <input type="text" name="line1" onChange={handleInputChangeAddress}/>
        </div>

        <div className="form__pay">
          <h2 className="form__title"> Payment with card</h2>
          <div className="form__card-info">
            <h6 className="form__card-info-title">Card Information</h6>
            <CardElement
              options={CARD_OPTIONS}
              onChange={handleCardDetailsChange}
            />
            <div className="form__card-try">try: 4242424242424242 12/24 999</div>
          </div>
  
          {checkoutError && <div className="form__info-req">{checkoutError}</div>}

          <button className="button-pay" disabled={isProcessing || !stripe}>
            {isProcessing ? "Processing..." : `Pay ${profile.totalAmount} $`}
          </button>
          <div className="form__transaction-safe"> <img src="/images/icon-lock.svg" alt="we are safe"/> Your transaction is secured with SSL encryption</div>
        </div>

      </form>
    </div>
  );
};

export default StripeCheckoutForm;