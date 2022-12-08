import React from 'react';
import styles from './Card.module.css';
import Visa from '../Icons/Visa';
import MasterCard from '../Icons/MasterCard';
import Amex from '../Icons/Amex';
import Discover from '../Icons/Discover';

export default function Card({
  cardNumber,
  cardHolder,
  expirationMonth,
  expirationYear,
  cvv,
}) {
  const isAmex = cardNumber.toString().startsWith('3');
  const visaColor = '#1a1f71';
  const amexColor = '#2e77bc';
  const mastercardColor = '#eb001b';
  const discoverColor = '#ff6600';

  function startsWithNumber(string) {
    return cardNumber.toString().startsWith(string);
  }
  const cardColor = () => {
    if (startsWithNumber('4')) {
      return visaColor;
    } else if (startsWithNumber('5')) {
      return mastercardColor;
    } else if (startsWithNumber('6')) {
      return discoverColor;
    } else if (isAmex) {
      return amexColor;
    }
  };

  function setCardLogo() {
    if (startsWithNumber('4')) {
      return <Visa fill={visaColor} />;
    } else if (startsWithNumber('5')) {
      return <MasterCard fill={mastercardColor} />;
    } else if (startsWithNumber('6')) {
      return <Discover fill={discoverColor} />;
    } else if (isAmex) {
      return <Amex fill={amexColor} />;
    }
  }
  const cardNumberFormatted =
    cardNumber && isAmex
      ? cardNumber
          .toString()
          .replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3')
          .trim()
      : cardNumber
          .toString()
          .replace(/(\d{4})/g, '$1 ')
          .trim();

  return (
    <div className={styles.card}>
      <div className={styles.magnetic_strip} />
      <div className={styles.row}>
        <div className={styles.card_shiney} />
        <div className={styles.card_icon}>
          {cardNumber ? setCardLogo() : null}
        </div>
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
