import classes from './Input.module.scss';
import { Path, FieldError, useForm, UseFormRegister, SubmitHandler } from 'react-hook-form';

interface IFormValues {
  [inputName: string]: string;
  login: string;
  password: string;
}

type InputProps = {
  type: string;
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  patternValue: RegExp;
  message: string;
  error: FieldError | null;
};

const Input = ({ type, label, register, required, patternValue, error, message }: InputProps) => {
  return (
    <div className={classes.wrapper}>
      <fieldset className={classes.input}>
        <legend>
          <label htmlFor={label}>{label}</label>
        </legend>
        <input
          id={label}
          type={type}
          {...register(label.toLocaleLowerCase(), {
            required: required,
            pattern: { value: patternValue, message },
          })}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      </fieldset>
      <p className={classes.errorMessage}>{error ? message : ''}</p>
    </div>
  );
};
export default Input;
