import React from 'react';
import styles from './Input.module.css';

export function Input({ className, label, name, type, register, errors }) {
  return (
    <div className={`${className ? className : ''} ${styles.form_input_group}`}>
      <label>{label ? label : 'Label'}</label>
      <input
        name={name ? name : 'input'}
        type={type ? type : 'text'}
        {...register}
        aria-invalid={errors ? 'true' : 'false'}
        className={`${styles.form_input} ${errors ? styles.invalid : null}`}
      />
      <div role="alert" className={styles.isInvalid}>
        {errors ? errors.message : null}
      </div>
    </div>
  );
}
