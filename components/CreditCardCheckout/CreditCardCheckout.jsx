import React from 'react';
import CardForm from '../CardForm/CardForm';
import styles from './CreditCardCheckout.module.css';

export function CreditCardCheckout() {
  return (
    <section className={styles.card_container}>
      <div className={styles.card}>
        <div className={styles.card_icon}>Card Icon</div>
        <div className={styles.card_numbers}>
          <span>1234</span>
          <span>5678</span>
          <span>9012</span>
          <span>3456</span>
        </div>
        <div className={styles.lower_wrapper}>
          <div className={styles.name}>
            <span>Card Holder</span>
            <p>Full Name</p>
          </div>
          <div className={styles.expiration}>
            <span>Expires</span>
            <p>MM/YY</p>
          </div>
        </div>
      </div>
      <CardForm />
    </section>
  );
}
