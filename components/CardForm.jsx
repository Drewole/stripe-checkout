import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './CardForm.module.css';

export default function CardForm() {
  // The Rules
  const validationSchema = Yup.object().shape({
    cardHolder: Yup.string().required('Cardholder Name is required'),
    cardNumber: Yup.string()
      .min(16)
      .max(17)
      .required('Card Number is required'),
    expirationMonth: Yup.string()
      .max(2, 'Must be in format MM/DD')
      .min(2, 'Not enough digits')
      .required('Expiration Date is required'),
    ccv: Yup.string().min(3).max(4).required('CCV is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  return (
    <section className={styles.form_container}>
      <form onSubmit={() => handleSubmit()}>
        <div className={styles.row}>
          <div className={styles.form_input_group}>
            <label>Card Number</label>
            <input
              name="Card Number"
              type="text"
              {...register('cardNumber')}
              className={`form-control ${
                errors.cardHolder ? 'is-invalid' : ''
              }`}
            />
            <div className="invalid-feedback">{errors.cardHolder?.message}</div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.form_input_group}>
            <label>Card Holder</label>
            <input
              name="Card Holder"
              type="text"
              {...register('cardHolder')}
              className={`form-control ${
                errors.cardHolder ? 'is-invalid' : ''
              }`}
            />
            <div className="invalid-feedback">{errors.cardHolder?.message}</div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.form_input_group}>
            <label>Expiration Date</label>
            <select
              name="expirationMonth"
              {...register('expirationMonth')}
              className={`form-control ${
                errors.expirationMonth ? 'is-invalid' : ''
              }`}
            >
              <option value=""></option>
              {Array.from(Array(12).keys()).map((month) => {
                const formattedNumber = (num) => {
                  return num.toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  });
                };

                console.log('formattedNumber', formattedNumber(month + 1));
                return (
                  <option key={month} value={formattedNumber(month + 1)}>
                    {formattedNumber(month + 1)}
                  </option>
                );
              })}
            </select>

            <input
              name="Card Holder"
              type="text"
              {...register('cardHolder')}
              className={`form-control ${
                errors.cardHolder ? 'is-invalid' : ''
              }`}
            />
            <div className="invalid-feedback">{errors.cardHolder?.message}</div>
          </div>
        </div>
      </form>
    </section>
  );
}
