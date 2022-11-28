import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import Expense from '../interfaces/Expense';
import { useState } from 'react';
import { useAppDispatch } from "../hooks/hooks";
import { useNavigate } from 'react-router-dom';
import { startAddExpense, startEditExpense } from '../actions/expenses';

const ExpenseForm = ({ existingExpense }: { existingExpense: Expense | null }) => {
    const isUpdate = existingExpense !== null;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [description, setDescription] = useState(existingExpense?.description ?? '');
    const [note, setNote] = useState(existingExpense?.note ?? '');
    const [amount, setAmount] = useState(existingExpense ? (existingExpense.amount / 100).toString() : '');
    const [date, setDate] = useState(existingExpense ? moment(existingExpense.date) : moment());
    const [calendarFocused, setCalendarFocused] = useState(false);
    const [error, setError] = useState('');

    return (
        <form className="form" onSubmit={(e) => {
            e.preventDefault();

            if (!description || !amount) {
                setError('Please provide description and amount.');
            }
            else {
                setError('');

                const expense: Expense = {
                    id: null,
                    description: description,
                    amount: parseFloat(amount) * 100,
                    date: date.valueOf(),
                    note: note
                };

                if (isUpdate) {
                    dispatch(startEditExpense(existingExpense.id!, expense));
                } else {
                    dispatch(startAddExpense(expense));
                }
                navigate('/');
            }
        }}>
            {error && <p className="form_error">{error}</p>}
            <input
                className="text-input"
                type="text"
                placeholder="Description"
                autoFocus
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)} />
            <input
                className="text-input"
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => {
                    const amount = e.currentTarget.value;
                    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
                        setAmount(amount);
                    }
                }} />
            <SingleDatePicker
                id="expenseDatePicker"
                date={date}
                onDateChange={(date) => {
                    if (date) {
                        setDate(date)
                    }
                }}
                focused={calendarFocused}
                onFocusChange={(e) => setCalendarFocused(e.focused)}
                numberOfMonths={1}
                isOutsideRange={() => false}
            />
            <textarea
                className="textarea"
                placeholder="Add a note for your expense"
                value={note}
                onChange={(e) => setNote(e.currentTarget.value)} />
            <div>
                <button className="button">Save Expense</button>
            </div>
        </form>
    );
};

export default ExpenseForm;