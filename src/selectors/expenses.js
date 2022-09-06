import moment from 'moment';

export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const createdAtMomment = moment(expense.createdAt);
        return (startDate?.isSameOrBefore(createdAtMomment, 'day') ?? true) &&
            (endDate?.isSameOrAfter(createdAtMomment, 'day') ?? true) &&
            expense.description.toLowerCase().includes(text.toLowerCase());
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }

        if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};
