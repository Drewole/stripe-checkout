import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './CardForm.module.css';
import { Input } from '../Input/Input';

export default function CardForm() {
  // The Rules
  const validationSchema = Yup.object().shape({
    cardHolder: Yup.string().required('Cardholder Name is required'),
    cardNumber: Yup.string()
      .min(16, 'Please check card number')
      .max(17, 'Max 17 digits reached')
      .required('Card Number is required'),
    expirationMonth: Yup.string().required('Expiration Date is required'),
    expirationYear: Yup.string().required('Expiration Date is required'),
    ccv: Yup.string().min(3, 'ccv required').max(4).required('CCV is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const isAmex = false;

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);

  const { errors } = formState;
  const currentYear = new Date().getFullYear();
  const nextTenYears = Array.from(
    new Array(10),
    (val, index) => index + currentYear
  );

  return (
    <section className={styles.form_container}>
      <form onSubmit={() => handleSubmit()}>
        <div className={styles.row}>
          <Input
            label="Card Number"
            name="cardNumber"
            type="text"
            register={register('cardNumber', {
              required: true,
              maxLength: isAmex ? 17 : 16,
            })}
            errors={errors.cardNumber}
          />
        </div>
        <div className={styles.row}>
          <Input
            label={'Card Holder'}
            name={'Card Holder'}
            type={'text'}
            register={register('cardholder', {
              required: true,
            })}
            errors={errors.cardHolder}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.form_input_group}>
            <label>Expiration Date</label>
            <div className={styles.expiration_date_wrapper}>
              <select
                name="expirationMonth"
                {...register('expirationMonth', { required: true })}
                className={`${styles.select} ${
                  errors.expirationMonth ? styles.invalid : null
                }`}
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
                className={`${styles.select} ${
                  errors.expirationYear ? styles.invalid : null
                }`}
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
        </div>
      </form>
    </section>
  );
}
