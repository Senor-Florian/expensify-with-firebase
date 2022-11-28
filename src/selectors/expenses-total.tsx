import Expense from '../interfaces/Expense';

export default (expenses: Expense[]) => {
    return expenses.map((expense) => expense.amount).reduce((prev, curr) => prev + curr, 0);
};