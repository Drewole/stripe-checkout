import { ReactDOM } from 'react';
import styles from '../CardForm/CardForm.module.css';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

export default function StripeForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };

  const currentYear = new Date().getFullYear();
  const nextTenYears = Array.from(
    new Array(10),
    (val, index) => index + currentYear
  );

  return (
    <section className={styles.form_container}>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe || !elements}>
          Pay
        </button>
      </form>
    </section>
  );
}
