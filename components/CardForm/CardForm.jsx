import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './CardForm.module.css';
import { Input } from '../Input/Input';
import { useEffect } from 'react';

export default function CardForm({ setCardInfo }) {
  // The Rules
  const validationSchema = Yup.object().shape({
    cardHolder: Yup.string().required('Cardholder Name is required'),
    cardNumber: Yup.string()
      .min(16, 'Please check card number')
      .max(17, 'Max 17 digits reached')
      .required('Card Number is required'),
    expirationMonth: Yup.string().required('Expiration Date is required'),
    expirationYear: Yup.string().required('Expiration Date is required'),
    cvv: Yup.string().min(3, 'cvv required').max(4).required('cvv is required'),
  });
  const initialValues = {
    cardHolder: '',
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cvv: '',
  };
  // get functions to build form with useForm() hook
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState, getValues } =
    useForm(formOptions);

  const isAmex = false;

  console.log('formState', formState);
  const values = getValues();

  const { errors } = formState;
  const currentYear = new Date().getFullYear();
  const nextTenYears = Array.from(
    new Array(10),
    (val, index) => index + currentYear
  );

  function onSubmit(data) {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    console.log('data', data);
    return false;
  }

  return (
    <section className={styles.form_container}>
      <form onSubmit={() => handleSubmit(onSubmit(data))}>
        <div className={`${styles.row} ${styles.number}`}>
          <Input
            label="Card Number"
            name="cardNumber"
            type="number"
            maxlength={isAmex ? 17 : 16}
            {...register('cardNumber', {
              required: true,
              maxLength: isAmex ? 17 : 16,
            })}
            errors={errors.cardNumber}
          />
        </div>
        <div className={`${styles.row} ${styles.holder}`}>
          <Input
            label={'Card Holder'}
            name={'Card Holder'}
            type={'text'}
            {...register('cardholder', {
              required: true,
            })}
            errors={errors.cardHolder}
          />
        </div>
        <div className={styles.row}>
          <div className={`${styles.form_input_group} ${styles.expiration}`}>
            <label>Expiration Date</label>
            <div className={styles.expiration_date_wrapper}>
              <select
                name="expirationMonth"
                {...register('expirationMonth', { required: true })}
                className={`${errors.expirationMonth ? styles.invalid : null}`}
                errors={errors.expirationMonth}
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
                    <option key={month} value={formattedNumber(month + 1)}>
                      {formattedNumber(month + 1)}
                    </option>
                  );
                })}
              </select>
              <select
                name="expirationYear"
                {...register('expirationYear', { required: true })}
                className={`${errors.expirationYear ? styles.invalid : ''}`}
                errors={errors.expirationYear}
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
              <div role="alert" className={styles.errors}>
                <div>{errors.expirationMonth?.message}</div>
                <div>{errors.expirationYear?.message}</div>
              </div>
            </div>
          </div>
          <div className={`${styles.form_input_group} ${styles.cvv_wrapper}`}>
            <Input
              label={'CVV'}
              className={styles.cvv}
              name={'cvv'}
              type={'number'}
              maxlength={isAmex ? 4 : 3}
              {...register('cvv', {
                required: true,
              })}
              errors={errors.cvv}
            />
            <div role="alert" className={styles.errors}>
              <div>{errors.cvv?.message}</div>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
