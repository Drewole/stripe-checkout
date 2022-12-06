import React from 'react';
import Card from '../Card/Card';
import CardForm from '../CardForm/CardForm';
import styles from './CreditCardCheckout.module.css';

export function CreditCardCheckout() {
  return (
    <section className={styles.container}>
      <Card
        cardNumber={1234567812345678}
        cardHolder={'Drew Olsen'}
        expirationMonth={11}
        expirationYear={2027}
        ccv={345}
      />
      <CardForm />
    </section>
  );
}
