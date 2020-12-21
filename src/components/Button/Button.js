import s from "./Button.module.css";

export default function Button({ increment }) {
  return (
    <button type="submit" className={s.Button} onClick={increment}>
      Load more
    </button>
  );
}
