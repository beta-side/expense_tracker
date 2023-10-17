import styles from './TransactionDetails.module.css';

function TransactionDetail(props) {
  return (
    <section className ={styles.detail}>
      <h1>{props.category}</h1>
      <h2>{props.source}</h2>
      <h3>{props.amount}</h3>
      <h3>{props.date}</h3>
      <p>{props.description}</p>
    </section>
  );
}

export default TransactionDetail;
