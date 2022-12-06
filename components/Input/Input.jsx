import React from 'react';
import styles from './Input.module.css';

export function Input({ label, name, type, register, errors }) {
  return (
    <div className={styles.form_input_group}>
      <label className={styles.label_text}>{label || 'Label'}</label>
      <input
        name={name || 'input'}
        type={type || 'text'}
        {...register}
        aria-invalid={errors ? 'true' : 'false'}
        className={`${styles.form_input} ${errors ? 'is-invalid' : ''}`}
      />
      <div role="alert" className={styles.isInvalid}>
        {errors?.message}
      </div>
    </div>
  );
}