import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './CardForm.module.css';
import { TextInput } from '../Forms/TextInput/TextInput';
import { useEffect } from 'react';
import Label from '../Forms/Label/Label';

export default function CardForm({ visualCardInfo, setVisualCardInfo }) {
  // The Rules
  const validationSchema = Yup.object().shape({
    card_number: Yup.string()
      .test(
        'test-number',
        'Credit Card number is invalid',
        (value) => valid.number(value).isValid
      ) // return true false based on validation
      .required(),
    card_holder: Yup.string().required('card_holder Name is required'),
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
  const { register, handleSubmit, control, formState, getValues } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const isAmex = false;

  const { errors } = formState;
  const currentYear = new Date().getFullYear();
  const nextTenYears = Array.from(
    new Array(10),
    (val, index) => index + currentYear
  );

  const onSubmit = (data) => {
    console.log('submitted Data', data);
  };

  return (
    <section className={styles.form_container}>
      <form onSubmit={() => handleSubmit(onSubmit(data))}>
        <div className={`${styles.row} ${styles.number}`}>
          <div className={`${styles.form_input_group}`}>
            <Label>Card Number</Label>
            <Controller
              name="card_number"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  aria-invalid={errors ? 'true' : 'false'}
                  maxLength={isAmex ? 17 : 16}
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
          </div>
        </div>
        <div className={`${styles.row} ${styles.holder}`}>
          <div className={`${styles.form_input_group}`}>
            <Label>Card Holder</Label>
            <Controller
              name="card_holder"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
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
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.form_input_group} ${styles.expiration}`}>
            <Label>Expiration Date</Label>
            <div className={styles.expiration_date_wrapper}>
              <Controller
                name="expiration_month"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
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
                        <option key={month} value={formattedNumber(month + 1)}>
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
                rules={{ required: true }}
                render={({ field }) => (
                  <select
                    {...field}
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
            </div>
          </div>
          <div className={`${styles.form_input_group} ${styles.cvv_wrapper}`}>
            <Label>CVV</Label>
            <Controller
              name="cvv"
              control={control}
              defaultValue=""
              rules={{ required: true, maxLength: isAmex ? 4 : 3 }}
              render={({ field }) => (
                <input
                  {...field}
                  onChange={(e) => {
                    const { value } = e.target;
                    field.onChange(value);
                    setVisualCardInfo({
                      ...visualCardInfo,
                      cvv: value,
                    });
                  }}
                  type={'text'}
                  maxLength={isAmex ? 17 : 16}
                />
              )}
            />
          </div>
        </div>
        <div className={styles.row}>
          <input type="submit" value="Submit" className={styles.submit} />
        </div>
      </form>
    </section>
  );
}
