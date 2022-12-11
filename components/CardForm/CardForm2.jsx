import { useForm } from 'react-hook-form';
import styles from './CardForm.module.css';
import { TextInput } from '../Forms/TextInput/TextInput';
import { useEffect } from 'react';
import FormProvider, { useFormContext } from '../Forms/FormProvider';
import StandardInput from '../Forms/StandardInput/StandardInput';

export default function CardForm2({ setCardInfo }) {
  // The Rules
  const initialValues = {
    cardHolder: '',
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cvv: '',
  };
  // get functions to build form with useForm() hook

  const { register, handleSubmit, reset, formState, getValues } = useForm();

  const isAmex = false;

  const currentYear = new Date().getFullYear();
  const nextTenYears = Array.from(
    new Array(10),
    (val, index) => index + currentYear
  );
  const { control, errors } = useFormContext();
  const onSubmit = (data) => console.log('submitted Data', data);
  const cvvLength = isAmex ? 4 : 3;
  const cardNumberLength = isAmex ? 17 : 16;
  return (
    <section className={styles.form_container}>
      <FormProvider>
        <div className={styles.row}>
          <div className={`${styles.form_input_group}`}>
            <StandardInput
              type="number"
              name="card_number"
              label="Card Number"
              rules={{ required: 'Valid Card Number Required' }}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.form_input_group}>
            <label>Card Holder</label>
            <input
              name={'cardHolder'}
              type={'text'}
              aria-invalid={errors ? 'true' : 'false'}
              className={errors ? styles.invalid : ''}
              {...register('cardHolder', {
                required: true,
              })}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.form_input_group} ${styles.expiration}`}>
            <label>Expiration Date</label>
            <div className={styles.expiration_date_wrapper}>
              <select
                name="expirationMonth"
                {...register('expirationMonth', { required: true })}
                className={errors ? styles.invalid : ''}
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
                className={errors ? styles.invalid : ''}
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
            </div>
          </div>
          <div className={`${styles.form_input_group} ${styles.cvv_wrapper}`}>
            <label>CVV</label>
            <input
              name={'cvv'}
              type={'text'}
              aria-invalid={errors ? 'true' : 'false'}
              className={errors ? styles.invalid : ''}
              maxLength={cvvLength}
              {...register('cvv', {
                required: true,
                maxLength: cvvLength,
                minLength: cvvLength,
              })}
            />
          </div>
        </div>
        <div className={styles.row}>
          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </div>
      </FormProvider>
    </section>
  );
}
