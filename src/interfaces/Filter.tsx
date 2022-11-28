import moment from "moment";

interface Filter {
    text: string,
    sortBy: string,
    startDate: moment.Moment,
    endDate: moment.Moment,
}

// todo date fns INSTEAD OF MOMENT

export default Filter;