import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import { startRemoveExpense } from '../actions/expenses';
import Expense from '../interfaces/Expense';
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const EditExpensePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const params = { id: window.location.pathname.split("/")[2] }
    const expense = useAppSelector(state => state.expenses).find((expense : Expense) => expense.id === params.id) as Expense | null; // todo this could be better
    const id = expense?.id ?? '';

    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Edit Expense</h1>
                </div>
            </div>
            <div className="content-container">
                <ExpenseForm
                    existingExpense={expense}
                />
                <button className="button button--secondary" onClick={() => {
                    dispatch(startRemoveExpense({ id }))
                    navigate('/');
                }}
                >Remove Expense</button>
            </div>
        </div>
    );
}

export default EditExpensePage;