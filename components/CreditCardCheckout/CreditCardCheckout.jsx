import { useState } from 'react';
import Card from '../Card/Card';
import CardForm from '../CardForm/CardForm';
import styles from './CreditCardCheckout.module.css';

export function CreditCardCheckout() {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationMonth: '',
    expirationYear: '',
    ccv: '',
  });

  return (
    <section className={styles.container}>
      <Card
        isAmex
        cardNumber={6345678123456789}
        cardHolder={'Drew Olsen'}
        expirationMonth={11}
        expirationYear={2027}
        ccv={345}
      />
      <CardForm setCardInfo={setCardInfo} cardInfo={cardInfo} />
    </section>
  );
}
