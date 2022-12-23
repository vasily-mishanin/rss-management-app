import classes from './InputBoards.module.scss';
import { Path, FieldError, useForm, UseFormRegister, SubmitHandler } from 'react-hook-form';

interface IFormValues {
  [name: string]: string;
}

type InputProps = {
  type: string;
  label: string;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  patternValue: RegExp;
  message: string;
  error: FieldError | null;
  title?: string;
  variant?: 'input' | 'textarea';
  defaultValue?: string;
};

const InputBoards = ({
  type,
  label,
  register,
  required,
  patternValue,
  error,
  message,
  title,
  variant,
  defaultValue,
}: InputProps) => {
  return (
    <div className={classes.wrapper}>
      <fieldset className={classes.input}>
        <legend>
          <label htmlFor={label}>{title ? title : label}</label>
        </legend>
        {variant === 'textarea' ? (
          <textarea
            className={classes.textarea}
            id={label}
            rows={7}
            cols={20}
            {...register(label, {
              required: required,
              pattern: { value: patternValue, message },
            })}
            placeholder={` ${title ? title.toLowerCase() : label.toLowerCase()}`}
            defaultValue={defaultValue ? defaultValue : ''}
          />
        ) : (
          <input
            id={label}
            type={type}
            {...register(label, {
              required: required,
              pattern: { value: patternValue, message },
            })}
            placeholder={` ${title ? title.toLowerCase() : label.toLowerCase()}`}
            defaultValue={defaultValue ? defaultValue : ''}
          />
        )}
      </fieldset>
      <p className={classes.errorMessage}>{error ? message : ''}</p>
    </div>
  );
};
export default InputBoards;
