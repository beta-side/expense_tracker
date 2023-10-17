import Link from "next/link";
import style from "./Transaction.module.css";

const Transaction = ({id,category, source, date, amount, type, description, transactionCategory}) => {
  return (
    <li className={style.transaction} >
      <Link href={`/transactions/${id}&${transactionCategory}`}>
      <div >
        <h3>{category}</h3>
        <div className={style.date}>{date}</div>
        <div className={style.amount}>${amount}</div>
        <div className={style.description}>{source}</div>
        <div className={style.description}>{description}</div>
      </div>
      </Link>
    </li>
  );
};

export default Transaction;
