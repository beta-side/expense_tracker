import TransactionList from "@/components/transactions/TransactionList";
import { Fragment } from "react";
import { MongoClient } from "mongodb";
import  Head  from "next/head";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Expense Tracker</title>
        <meta 
          name='description'
          content='Track your expenses through this Site'
        />
      </Head>
      <div>
        <h1>Expense</h1>
        <TransactionList transactions={props.expenses} />
      </div>
      <div>
        <h1>Income</h1>
        <TransactionList transactions={props.incomes} />
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://jonas6900:P7bYftohSMUm57K1@cluster0.8lhaovu.mongodb.net/ExpenseTracker?retryWrites=true&w=majority"
  );
  const db = client.db();
  const incomeTrackerCollection = db.collection("Income");
  const incomeList = await incomeTrackerCollection.find().toArray();
  const expenseTrackerCollection = db.collection("Expense");
  const expenseList = await expenseTrackerCollection.find().toArray();

  client.close();

  return {
    props: {
      expenses: expenseList.map((expense) => ({
        id: expense._id.toString(),
        category: expense.category,
        date: expense.date,
        source: expense.source,
        amount: expense.amount,
        description: expense.description,
        transactionCategory: expense.transactionCategory,
      })),
      incomes: incomeList.map((expense) => ({
        id: expense._id.toString(),
        category: expense.category,
        date: expense.date,
        source: expense.source,
        amount: expense.amount,
        description: expense.description,
        transactionCategory: expense.transactionCategory,
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
