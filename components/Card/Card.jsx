import React from 'react';
import styles from './Card.module.css';

export default function Card({
  cardNumber,
  cardHolder,
  expirationMonth,
  expirationYear,
  ccv,
}) {
  const cardNumberFormatted = cardNumber
    ? cardNumber
        .toString()
        .replace(/(\d{4})/g, '$1 ')
        .trim()
    : '123';

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <div className={styles.card_shiney} />
        <div className={styles.card_icon}>Card Icon</div>
      </div>
      <div className={styles.row}>
        <div className={styles.card_numbers}>{cardNumberFormatted}</div>
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
