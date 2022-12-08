import { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAppState from '../providers/AppProvider';

const FormContext = createContext({});

export default function FormProvider({
  children,
  onSubmit,
  additionalData,
  thankYouMessage,
  onSuccess,
  className,
}) {
  const { handleSubmit, control, errors, register } = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const renderFields = () => !success && children;

  const renderThankYou = () =>
    success && (
      <div className="form__thank_you">
        <p>Success! Order Placed.</p>
      </div>
    );

  const renderError = () =>
    error &&
    !success && (
      <div>
        <p>{error}</p>
      </div>
    );

  const submitHandler = handleSubmit((formData, addData) => {
    //TODO: Function posting to stripe API will go here if I cant get it into next js's backend

    submit({ ...formData, ...additionalData })
      .then((resp) => {
        if (resp.error) {
          return setError(error.message || 'An error occurred.');
        }
        //Our Form has been successfully submitted
        setSuccess(true);
        onSuccess();
      })
      .catch((error) => {
        //Oops, something went wrong
        console.error(error);
        setError(error.message || 'An error occurred.');
      });
  });

  return (
    <FormContext.Provider
      value={{
        control,
        register,
        errors,
      }}
    >
      <form className={`${className} form`} onSubmit={submitHandler}>
        {renderFields()}
        {renderThankYou()}
        {renderError()}
      </form>
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
