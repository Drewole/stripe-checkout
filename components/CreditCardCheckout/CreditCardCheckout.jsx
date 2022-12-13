import { useState } from 'react';
import Card from '../Card/Card';
import CardForm from '../CardForm/CardForm';
import styles from './CreditCardCheckout.module.css';
import { motion } from 'framer-motion';

export function CreditCardCheckout() {
  const [visualCardInfo, setVisualCardInfo] = useState({
    card_number: '',
    card_holder: '',
    expiration_month: '',
    expiration_year: '',
    cvv: '',
  });

  const { card_number, card_holder, expiration_month, expiration_year, cvv } =
    visualCardInfo;
  return (
    <section className={styles.container}>
      <motion.div
        transition={{ delay: 0.25 }}
        initial={{ y: -30, opacity: 0, zIndex: 1 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Card
          cardNumber={card_number ? card_number : 'xxxx xxxx xxxx xxxx'}
          cardHolder={card_holder ? card_holder : 'Name'}
          expirationMonth={expiration_month ? expiration_month : 'MM'}
          expirationYear={expiration_year ? expiration_year : 'YYYY'}
          cvv={cvv}
        />
      </motion.div>
      <motion.div
        transition={{ delay: 0.75 }}
        initial={{ y: -30, opacity: 0, zIndex: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <CardForm
          setVisualCardInfo={setVisualCardInfo}
          visualCardInfo={visualCardInfo}
        />
      </motion.div>
    </section>
  );
}
