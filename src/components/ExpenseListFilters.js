import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };
    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused })); 
    };
    render() {
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={(e) => handleTextFilterChange(e, this.props)} />
                <select value={this.props.filters.sortBy} onChange={(e) => handleSortChange(e, this.props)} >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker 
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>
        )
    }
}

const handleTextFilterChange = (e, props) => {
    props.dispatch(setTextFilter(e.target.value));
};

const handleSortChange = (e, props) => {
    if (e.target.value === 'date')
        props.dispatch(sortByDate());
    else if (e.target.value === 'amount')
        props.dispatch(sortByAmount());
};

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);