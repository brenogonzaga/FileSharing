import styles from './input.module.scss';

type Props = {
  label?: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: Props) => {
  return (
    <>
      {props.label && <label>{props.label}:</label>}
      <input
        className={styles.input}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
      />
    </>
  );
};
