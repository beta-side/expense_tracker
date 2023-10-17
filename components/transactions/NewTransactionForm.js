import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewTransactionForm.module.css";

function NewMeetupForm(props) {
  const categoryInputRef = useRef();
  const dateInputRef = useRef();
  const sourceInputRef = useRef();
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredCategory = categoryInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    const enteredSource = sourceInputRef.current.value;
    const enteredamount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const transactionData = {
      type: props.type,
      category: enteredCategory,
      date: enteredDate,
      source: enteredSource,
      amount: enteredamount,
      description: enteredDescription,
    };

    props.onAddTransaction(transactionData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="type">Transaction Type</label>
          <input type="text" required id="type" ref={categoryInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="date">Date</label>
          <input type="date" required id="date" ref={dateInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="source">Source</label>
          <input type="text" required id="source" ref={sourceInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="amount">Amount</label>
          <input type="number" required id="amount" ref={amountInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
