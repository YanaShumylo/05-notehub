import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  error: Error;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return <p className={css.text}>Error: {error.message}</p>;
}