import React from 'react';
import styles from './Card.module.css';

export default function Card({
  firstNumber,
  cardNumber,
  cardHolder,
  expirationMonth,
  expirationYear,
  ccv,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <div className={styles.card_shiney} />
        <div className={styles.card_icon}>Card Icon</div>
      </div>
      <div className={styles.row}>
        <div className={styles.card_numbers}>
          <span>1234</span>
          <span>5678</span>
          <span>9012</span>
          <span>3456</span>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.name}>
          <span>Card Holder</span>
          <p>{cardHolder}</p>
        </div>
        <div className={styles.expiration}>
          <span>Expires</span>
          <p>{`${expirationMonth}/${expirationYear}`}</p>
        </div>
      </div>
    </div>
  );
}
