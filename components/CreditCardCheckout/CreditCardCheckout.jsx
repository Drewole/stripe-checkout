import { useState } from 'react';
import Card from '../Card/Card';
import CardForm from '../CardForm/CardForm';
// import CardForm2 from '../CardForm/CardForm2';
// import FormProvider from '../Forms/FormProvider';
// import { Elements } from '@stripe/react-stripe-js';
// import StripeForm from '../StripeForm/StripeForm';
import styles from './CreditCardCheckout.module.css';

export function CreditCardCheckout() {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationMonth: '',
    expirationYear: '',
    cvv: '',
  });

  return (
    <section className={styles.container}>
      <Card
        isAmex
        cardNumber={6345678123456789}
        cardHolder={'Drew Olsen'}
        expirationMonth={11}
        expirationYear={2027}
        cvv={345}
      />
      <CardForm />
    </section>
  );
}
