import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './CardForm.module.css';
import { TextInput } from '../Forms/TextInput/TextInput';
import { useEffect } from 'react';

export default function CardForm({ setCardInfo }) {
  // The Rules
  const validationSchema = Yup.object().shape({
    card_holder: Yup.string().required('card_holder Name is required'),
    card_number: Yup.string()
      .min(16, 'Please check card number')
      .max(17, 'Max 17 digits reached')
      .required('Card Number is required'),
    expiration_month: Yup.string().required('Expiration Date is required'),
    expiration_year: Yup.string().required('Expiration Date is required'),
    cvv: Yup.string().min(3, 'cvv required').max(4).required('cvv is required'),
  });
  const initialValues = {
    card_holder: '',
    card_number: '',
    expiration_month: '',
    expiration_year: '',
    cvv: '',
  };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, control, reset, formState, getValues } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: initialValues,
    });

  const isAmex = false;

  const values = getValues();

  const { errors } = formState;
  const currentYear = new Date().getFullYear();
  const nextTenYears = Array.from(
    new Array(10),
    (val, index) => index + currentYear
  );

  const onSubmit = (data) => {
    debugger;
    console.log('submitted Data', data);
  };

  return (
    <section className={styles.form_container}>
      <form onSubmit={() => handleSubmit(onSubmit(data))}>
        <div className={`${styles.row} ${styles.number}`}>
          <div className={`${styles.form_input_group}`}>
            <label>Card Number</label>
            <Controller
              name="card_number"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type={'number'}
                    aria-invalid={errors ? 'true' : 'false'}
                    className={`${styles.form_input} ${
                      errors ? styles.invalid : null
                    }`}
                    maxLength={isAmex ? 17 : 16}
                    {...register('card_number', {
                      required: true,
                      maxLength: isAmex ? 17 : 16,
                    })}
                    errors={errors.card_number}
                  />
                  <div role="alert" className={styles.isInvalid}>
                    {errors.card_number?.message}
                  </div>
                </>
              )}
            />
          </div>
        </div>
        <div className={`${styles.row} ${styles.holder}`}>
          <div className={`${styles.form_input_group}`}>
            <label>Card Holder</label>
            <Controller
              name="card_holder"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type={'text'}
                    aria-invalid={errors ? 'true' : 'false'}
                    className={`${styles.form_input} ${
                      errors ? styles.invalid : null
                    }`}
                    maxLength={isAmex ? 17 : 16}
                    {...register('card_holder', {
                      required: true,
                    })}
                    errors={errors.card_holder}
                  />
                  <div role="alert" className={styles.isInvalid}>
                    {errors.card_holder?.message}
                  </div>
                </>
              )}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.form_input_group} ${styles.expiration}`}>
            <label>Expiration Date</label>
            <div className={styles.expiration_date_wrapper}>
              <Controller
                name="expiration_month"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <select
                      {...field}
                      {...register('expiration_month', { required: true })}
                      errors={errors.expiration_month}
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
                  </>
                )}
              />
              <Controller
                name="expiration_year"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <select
                      rules={{ required: true }}
                      errors={errors.expiration_year}
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
                  </>
                )}
              />
            </div>
          </div>
          <div className={`${styles.form_input_group} ${styles.cvv_wrapper}`}>
            <label>CVV</label>
            <Controller
              name="cvv"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type={'text'}
                    aria-invalid={errors ? 'true' : 'false'}
                    maxLength={isAmex ? 17 : 16}
                    rules={{ required: true, maxLength: isAmex ? 4 : 3 }}
                    errors={errors.cvv}
                  />
                  <div role="alert" className={styles.isInvalid}>
                    {errors.cvv?.message}
                  </div>
                </>
              )}
            />
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
