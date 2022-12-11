import { Controller } from 'react-hook-form';
import ErrorMessage from './../ErrorMessage/ErrorMessage';
import { middleware } from '../formUtils';
import Label from './../Label/Label';
import { useFormContext } from '../FormProvider';
// import { v4 as uuidv4 } from 'uuid';

// const UUID = uuidv4();

export default function StandardInput({
  name,
  placeholder,
  type,
  label,
  rules,
  hiddenValue,
  className,
  defaultValue,
  disabled,
  middleware,
}) {
  const { control, errors } = useFormContext();
  const id = `${name}`;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ onChange, value = '' }) => (
        <div
          className={'field field-input ' + className}
          // style={{ display: type === "hidden" ? "none" : "block" }}
        >
          <div className={'control'}>
            <Label value={label} htmlFor={id}>
              <input
                id={id}
                disabled={disabled}
                onChange={(e) => onChange(middleware(e.target.value))}
                type={type}
                name={name}
                value={hiddenValue ? hiddenValue : value}
                placeholder={placeholder}
                className={'input'}
              />
            </Label>
          </div>
          {/* <ErrorMessage error={errors[name]} /> */}
        </div>
      )}
    />
  );
}
