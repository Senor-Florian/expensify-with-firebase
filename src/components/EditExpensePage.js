import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import { editExpense } from '../actions/expenses';
import { removeExpense } from '../actions/expenses';

const EditExpensePage = (props) => {
    const navigate = useNavigate();

    return (
        <div>
            <ExpenseForm
                expense={props.expense}
                onSubmit={(expense) => {
                    props.dispatch(editExpense(props.expense.id, expense));
                    navigate('/', true);
                }}
            />
            <button onClick={() => {
                handleOnRemove(props.dispatch, props.expense.id);
                navigate('/', true)
            }}
            >Remove</button>
        </div>
    );
}

const handleOnRemove = (dispatch, id) => {
    dispatch(removeExpense({ id }));
}

const mapStateToProps = (state) => {
    const params = { id: window.location.pathname.split("/")[2] }
    return {
        expense: state.expenses.find((expense) => expense.id === params.id)
    }
};

export default connect(mapStateToProps)(EditExpensePage);