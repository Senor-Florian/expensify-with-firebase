import { get, push, ref, remove, update } from 'firebase/database';
import database from '../firebase/firebase';
import Expense from '../interfaces/Expense';

export const addExpense = (expense : any) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData : Expense) => {
    return (dispatch : any, getState : any) => {
        const uid = getState().auth.uid;
        const {
            description = '', note = '', amount = 0, date = 0
        } = expenseData;

        const expense = { description, note, amount, date }

        return push(ref(database, `users/${uid}/expenses`), expense)
            .then((ref) => {
                dispatch(addExpense({
                    id: ref.key,
                    ...expense
                }));
            });
    };
};

export const removeExpense = ({ id } : { id : string}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({ id } : { id : string}) => {
    return (dispatch : any, getState : any) => {
        const uid = getState().auth.uid;
        return remove(ref(database, `users/${uid}/expenses/${id}`)).then(() => {
            dispatch(removeExpense({ id }));
        });
    };
};

export const editExpense = (id : string, updates : Expense) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id : string, updates : Expense) => {
    return (dispatch : any, getState : any) => {
        const uid = getState().auth.uid;
        return update(ref(database, `users/${uid}/expenses/${id}`), updates).then(() => {
            dispatch(editExpense(id, updates ));
        });
    };
};

export const setExpenses = (expenses : Expense[]) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch : any, getState : any) => {
        const uid = getState().auth.uid;
        return get(ref(database, `users/${uid}/expenses`)).then((snapshot) => {
            const expenses : Expense[] = [];
            snapshot.forEach((child) => {
                expenses.push({
                    id: child.key,
                    ...child.val()
                });
            });

            dispatch(setExpenses(expenses));
        });
   };
};
