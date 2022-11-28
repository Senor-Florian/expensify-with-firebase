interface Expense {
    id: string | null, // todo change it to guid when moving persistence to .net api
    amount: number,
    date: number, // todo maybe change this to proper datetime
    description: string,
    note: string
}

export default Expense;