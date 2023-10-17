import { useRouter } from "next/router";
import Head from 'next/head';
import { useState, Fragment } from "react";
import NewTransactionForm from "../../components/transactions/NewTransactionForm";
import classes from "../../components/transactions/NewTransactionForm.module.css";

function NewTransaction() {
  const router = useRouter();
  const [transactionCategory, setTransactionCategory] = useState(null);

  async function addTransactionHandler(transactionData) {
    const response = await fetch("/api/new-transaction", {
      method: "POST",
      body: JSON.stringify({...transactionData, 
        transactionCategory: transactionCategory}),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    router.push("/");
  }

  function expenseCategoryHandler() {
    setTransactionCategory("Expense");
  }

  function incomeCategoryHandler() {
    setTransactionCategory("Income");
  }

  console.log(transactionCategory);
  return (
    <Fragment>
      <Head>
        <title>New Transaction</title>
        <meta 
          name='description'
          content='Add A new transaction!'
        />
      </Head>
      {!transactionCategory && (
          <div className={classes.actions}>
            <button onClick={expenseCategoryHandler}>Add Expense</button>
            <button onClick={incomeCategoryHandler}>Add Income</button>
          </div>
      )}
      {transactionCategory && (
        <NewTransactionForm
          onAddTransaction={addTransactionHandler}
        />
      )}
    </Fragment>
  );
}
export default NewTransaction;
