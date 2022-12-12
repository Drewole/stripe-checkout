import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Card from '../Card/Card';
import CardForm from '../CardForm/CardForm';
import styles from './CreditCardCheckout.module.css';

export function CreditCardCheckout() {
  const [visualCardInfo, setVisualCardInfo] = useState({
    card_number: '',
    card_holder: '',
    expiration_month: '',
    expiration_year: '',
    cvv: '',
  });
  const { formState, getValues } = useForm();

  const { card_number, card_holder, expiration_month, expiration_year, cvv } =
    visualCardInfo;
  return (
    <section className={styles.container}>
      <Card
        cardNumber={card_number ? card_number : 'xxxx xxxx xxxx xxxx'}
        cardHolder={card_holder ? card_holder : 'Name'}
        expirationMonth={expiration_month ? expiration_month : 'MM'}
        expirationYear={expiration_year ? expiration_year : 'YYYY'}
        cvv={cvv}
      />
      <CardForm
        setVisualCardInfo={setVisualCardInfo}
        visualCardInfo={visualCardInfo}
      />
    </section>
  );
}
