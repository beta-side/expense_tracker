import Transaction from "./Transaction";


const TransactionList = ({transactions}) => {
    return <ul>
        {transactions.map(trans => <Transaction key={trans.id} id={trans.id} category={trans.category} date={trans.date} amount={trans.amount} description={trans.description} transactionCategory={trans.transactionCategory}/>)}
    </ul>
}

export default TransactionList;