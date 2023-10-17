import TransactionDetail from "@/components/transactions/TransactionDetails";
import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

function Transaction(props) {
  const router = useRouter();
  const transactionId = router.query.transactionId;
  return (
    <Fragment>
      <Head>
        <title>{props.transactionData.source}</title>
        <meta 
          name='description'
          content={props.transactionData.description}
        />
      </Head>
      <TransactionDetail
        id={props.transactionData.id}
        category={props.transactionData.category}
        date={props.transactionData.date}
        amount={props.transactionData.amount}
        source={props.transactionData.source}
        description={props.transactionData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://jonas6900:P7bYftohSMUm57K1@cluster0.8lhaovu.mongodb.net/ExpenseTracker?retryWrites=true&w=majority"
  );
  const db = client.db();
  const incomeTrackerCollection = db.collection("Income");
  const incomeList = await incomeTrackerCollection.find({}).toArray();
  const expenseTrackerCollection = db.collection("Expense");
  const expenseList = await expenseTrackerCollection.find({}).toArray();
  client.close();

  const expensePath = expenseList.map((trans) => ({
    params: {
      transactionId: trans._id.toString() + "&" + trans.transactionCategory,
    },
  }));

  return {
    fallback: false,
    paths: expensePath.concat(
      incomeList.map((trans) => ({
        params: {
          transactionId: trans._id.toString() + "&" + trans.transactionCategory,
        },
      }))
    ),
  };
}

export async function getStaticProps(context) {
  const transactionId = context.params.transactionId.split("&")[0];
  const collectionId = context.params.transactionId.split("&")[1];

  const client = await MongoClient.connect(
    "mongodb+srv://jonas6900:P7bYftohSMUm57K1@cluster0.8lhaovu.mongodb.net/ExpenseTracker?retryWrites=true&w=majority"
  );
  const db = client.db();
  const transactionCollection = db.collection(collectionId);
  const transaction = await transactionCollection.findOne({
    _id: new ObjectId(transactionId),
  });
  //fetch data from single transactions
  return {
    props: {
      transactionData: {
        id: transactionId,
        category: transaction.category,
        date: transaction.date,
        amount: transaction.amount,
        source: transaction.source,
        description: transaction.description,
      },
    },
  };
}
export default Transaction;
