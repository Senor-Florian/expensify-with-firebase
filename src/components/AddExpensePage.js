import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';
import { useNavigate } from 'react-router-dom';

const AddExpensePage = (props) => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Add Expense</h1>
            <ExpenseForm
                onSubmit={(expense) => { 
                    onSumbit(expense, props);
                    navigate('/');
                }}
            />
        </div>
    );

};

const onSumbit = (expense, props) => {
    props.dispatch(addExpense(expense));
};

export default connect()(AddExpensePage);