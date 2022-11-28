import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import { get, ref, set } from 'firebase/database';

const createMockStore = configureMockStore([thunk]);
const uid = 'testid';

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, date}) => {
        expensesData[id] = { description, note, amount, date };
    });
    set(ref(database, `users/${uid}/expenses`), expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

test('should remove expense from database', (done) => {
    const store = createMockStore({ auth: { uid }});
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return get(ref(database, `users/${uid}/expenses/${id}`)).then((snapshot) => {
            expect(snapshot.val()).toBeFalsy();
            done();
        });
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'updated note' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'updated note'
        }
    })
});

test('should edit expense from database', (done) => {
    const store = createMockStore({ auth: { uid }});
    const id = expenses[0].id;
    const updates = { amount: 21045 };
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });

        return get(ref(database, `users/${uid}/expenses/${id}`)).then((snapshot) => {
            expect(snapshot.val().amount).toEqual(updates.amount);
            done();
        });    
    });
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({ auth: { uid }});
    const expenseData = {
        description: 'Beer',
        amount: 500,
        note: '*burp*',
        date: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return get(ref(database, `users/${uid}/expenses/${actions[0].expense.id}`)).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });    
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({ auth: { uid }});
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        date: 0
    };
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return get(ref(database, `users/${uid}/expenses/${actions[0].expense.id}`)).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });    
    });
});


test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({ auth: { uid }});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});