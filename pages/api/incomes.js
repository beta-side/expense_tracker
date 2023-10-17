import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === "GET") {
  
      const client = await MongoClient.connect('mongodb+srv://jonas6900:P7bYftohSMUm57K1@cluster0.8lhaovu.mongodb.net/ExpenseTracker?retryWrites=true&w=majority')
      const db = client.db();
      const expenseTrackerCollection = db.collection('Income');
  
      const result = await expenseTrackerCollection.find().toArray();
  
      client.close();
    }
  }
  
  export default handler;
  