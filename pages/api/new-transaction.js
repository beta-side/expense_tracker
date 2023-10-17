// api/new-transaction.js
import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect('mongodb+srv://jonas6900:P7bYftohSMUm57K1@cluster0.8lhaovu.mongodb.net/ExpenseTracker?retryWrites=true&w=majority')
    const db = client.db();
    
    const expenseTrackerCollection = db.collection(data.transactionCategory);

    const result = await expenseTrackerCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({message: 'Transaction inserted: '+result});
  }
}

export default handler;
