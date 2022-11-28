import React from 'react';
import ExpenseForm from './ExpenseForm';

const AddExpensePage = (props : any) => {
    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1>Add Expense</h1>
                </div>
            </div>
            <div className="content-container">
                <ExpenseForm existingExpense={null}/>
            </div>
        </div>
    );

};

export default AddExpensePage;