import Link from 'next/link';
import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Expense Reporter</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/new-transaction'>Add A New Transaction</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
