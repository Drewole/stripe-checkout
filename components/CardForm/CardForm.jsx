import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import valid from 'card-validator';
import styles from './CardForm.module.css';
import Label from '../Forms/Label/Label';

export default function CardForm({ visualCardInfo, setVisualCardInfo }) {
  const [success, setSuccess] = useState(false);
  const [isAmex, setIsAmex] = useState(false);
  const initialValues = {
    card_holder: '',
    card_number: '',
    expiration_month: '',
    expiration_year: '',
    cvv: '',
  };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, control, formState, getValues } = useForm({
    mode: 'onBlur',
    defaultValues: initialValues,
  });
  const setCardType = (values) => {
    const { card_number } = values;
    const cardType = valid.number(card_number).card;
    if (cardType) {
      setIsAmex(
        cardType.type === 'american-express' ? cardType.lengths[0] : false
      );
    }
  };
  useEffect(() => {
    setCardType(visualCardInfo);
  }, [visualCardInfo.card_number]);

  const { errors } = formState;
  const currentYear = new Date().getFullYear();
  const nextTenYears = Array.from(
    new Array(10),
    (val, index) => index + currentYear
  );
  const fetchToken = async (values) => {
    const { card_number, card_holder, expiration_month, expiration_year, cvv } =
      values;
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        card_number,
        card_holder,
        expiration_month,
        expiration_year,
        cvv,
      }),
    });
    const data = await response.json();
    if (data.token) {
      setSuccess(true);
      console.log('success', data.token);
    }
  };

  const renderError = () =>
    errors && (
      <div>
        <p>{errors.message}</p>
      </div>
    );

  const onSubmit = (e) => {
    fetchToken(getValues());
    console.log('values', getValues());
    e.preventDefault();
  };
  const cardInputLength = isAmex ? isAmex : 16;
  return (
    <section className={styles.form_container}>
      {!success ? (
        <form onSubmit={(e) => handleSubmit(onSubmit(e))}>
          <div className={`${styles.row} ${styles.number}`}>
            <div className={`${styles.form_input_group}`}>
              <Label>Card Number</Label>
              <Controller
                name="card_number"
                rules={{
                  required: 'Card number is required', //This should also have validation from the card validator package
                  maxLength: {
                    value: isAmex ? isAmex : 16,
                    message: `Max length is ${cardInputLength}`, //This should be converted over to read from the card validator package
                  },
                  minLength: {
                    value: isAmex ? isAmex : 16,
                    message: `Min length is ${cardInputLength}`,
                  },
                }}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    className={errors.card_number ? styles.invalid : ''}
                    {...field}
                    type="text"
                    aria-invalid={errors ? 'true' : 'false'}
                    maxLength={cardInputLength}
                    onChange={(e) => {
                      const { value } = e.target;
                      field.onChange(value);
                      setVisualCardInfo({
                        ...visualCardInfo,
                        card_number: value,
                      });
                    }}
                  />
                )}
              />
              <span className={styles.error}>
                {errors.card_number?.message}
              </span>
            </div>
          </div>
          <div className={`${styles.row} ${styles.holder}`}>
            <div className={`${styles.form_input_group}`}>
              <Label>Card Holder</Label>
              <Controller
                name="card_holder"
                control={control}
                rules={{ required: 'Card holder required.' }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    className={errors.card_holder ? styles.invalid : ''}
                    {...field}
                    type={'text'}
                    onChange={(e) => {
                      const { value } = e.target;
                      field.onChange(value);
                      setVisualCardInfo({
                        ...visualCardInfo,
                        card_holder: value,
                      });
                    }}
                  />
                )}
              />
              <span className={styles.error}>
                {errors.card_holder?.message}
              </span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={`${styles.form_input_group} ${styles.expiration}`}>
              <Label>Expiration Date</Label>
              <div className={styles.expiration_date_wrapper}>
                <Controller
                  name="expiration_month"
                  control={control}
                  rules={{ required: 'Expiration Required' }}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      className={errors.expiration_month ? styles.invalid : ''}
                      onChange={(e) => {
                        const { value } = e.target;
                        field.onChange(value);
                        setVisualCardInfo({
                          ...visualCardInfo,
                          expiration_month: value,
                        });
                      }}
                    >
                      <option defaultValue value="">
                        Month
                      </option>
                      {Array.from(Array(12).keys()).map((month) => {
                        const formattedNumber = (num) => {
                          return num.toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                          });
                        };
                        return (
                          <option
                            key={month}
                            value={formattedNumber(month + 1)}
                          >
                            {formattedNumber(month + 1)}
                          </option>
                        );
                      })}
                    </select>
                  )}
                />
                <Controller
                  name="expiration_year"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Expiration Required' }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={errors.expiration_year ? styles.invalid : ''}
                      onChange={(e) => {
                        const { value } = e.target;
                        field.onChange(value);
                        setVisualCardInfo({
                          ...visualCardInfo,
                          expiration_year: value,
                        });
                      }}
                    >
                      <option defaultValue value="">
                        Year
                      </option>
                      {nextTenYears.map((year) => {
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  )}
                />
                <span className={`${styles.error} ${styles.expiration_error}`}>
                  {errors.expiration_month
                    ? errors.expiration_month.message
                    : errors.expiration_year
                    ? errors.expiration_year.message
                    : null}
                </span>
              </div>
            </div>
            <div className={`${styles.form_input_group} ${styles.cvv_wrapper}`}>
              <Label>CVV</Label>
              <Controller
                name="cvv"
                control={control}
                defaultValue=""
                rules={{
                  required: 'CVV code required',
                  maxLength: isAmex ? 4 : 3,
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    className={errors.cvv ? styles.invalid : ''}
                    onChange={(e) => {
                      const { value } = e.target;
                      field.onChange(value);
                      setVisualCardInfo({
                        ...visualCardInfo,
                        cvv: value,
                      });
                    }}
                    type={'text'}
                    maxLength={isAmex ? 4 : 3}
                  />
                )}
              />
              <span className={styles.error}>{errors.cvv?.message}</span>
            </div>
          </div>
          <div className={styles.row}>
            <input type="submit" value="Submit" className={styles.submit} />
          </div>
          <div className={styles.form_errors}>{renderError}</div>
        </form>
      ) : (
        <p className={styles.success}>Success! Thanks for your purchase!</p>
      )}
    </section>
  );
}
