import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
	{
		id: "e1",
		desc: "Running shoes",
		amount: 89.99,
		date: new Date("2025-01-15"),
	},
	{
		id: "e2",
		desc: "Groceries",
		amount: 127.5,
		date: new Date("2025-02-03"),
	},
	{
		id: "e3",
		desc: "Movie tickets",
		amount: 24.0,
		date: new Date("2025-02-18"),
	},
	{
		id: "e4",
		desc: "Dinner at Italian restaurant",
		amount: 65.8,
		date: new Date("2025-03-05"),
	},
	{
		id: "e5",
		desc: "New phone case",
		amount: 19.99,
		date: new Date("2025-03-22"),
	},
	{
		id: "e6",
		desc: "Gym membership",
		amount: 45.0,
		date: new Date("2025-04-01"),
	},
	{
		id: "e7",
		desc: "Book purchase",
		amount: 14.95,
		date: new Date("2025-04-12"),
	},
	{
		id: "e8",
		desc: "Car maintenance",
		amount: 220.0,
		date: new Date("2025-05-08"),
	},
	{
		id: "e9",
		desc: "Birthday gift",
		amount: 75.25,
		date: new Date("2025-05-20"),
	},
	{
		id: "e10",
		desc: "Summer clothes",
		amount: 132.4,
		date: new Date("2025-06-05"),
	},
	{
		id: "e11",
		desc: "Weekly groceries",
		amount: 92.35,
		date: new Date("2025-06-18"), // 2 days ago (assuming today is 2025-06-20)
	},
	{
		id: "e12",
		desc: "Movie tickets",
		amount: 28.5,
		date: new Date("2025-06-17"), // 3 days ago
	},
	{
		id: "e13",
		desc: "Gas refill",
		amount: 45.2,
		date: new Date("2025-06-15"), // 5 days ago
	},
];

export const ExpensesContext = createContext({
	expenses: [],
	addExpense: ({ desc, amount, data }) => {},
	deleteExpense: (id) => {},
	updateExpense: (id, { desc, amount, data }) => {},
});

function expensesReducer(state, action) {
	switch (action.type) {
		case "ADD":
			const id = new Date().toString() + Math.random().toString();
			return [{ ...action.payload, id: id }, ...state];
		case "UPDATE":
			const updatableExpenseIndex = state.findIndex(
				(expense) => expense.id === action.payload.id
			);

			const updatableExpense = state[updatableExpenseIndex];
			const updatedItem = { ...updatableExpense, ...action.payload.data };
			const updatedExpenses = [...state];
			updatedExpenses[updatableExpenseIndex] = updatedItem;
			return updatedExpenses;
		case "DELETE":
			return state.filter((expense) => expense.id !== action.payload);
		default:
			return state;
	}
}

function ExpensesContextProvider({ children }) {
	const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

	function addExpense(expenseData) {
		dispatch({ type: "ADD", payload: expenseData });
	}

	function deleteExpense(id) {
		dispatch({ type: "DELETE", payload: id });
	}

	function updateExpense(id, expenseData) {
		dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
	}

	const value = {
		expenses: expensesState,
		addExpense: addExpense,
		deleteExpense: deleteExpense,
		updateExpense: updateExpense,
	};

	return (
		<ExpensesContext.Provider value={value}>
			{children}
		</ExpensesContext.Provider>
	);
}

export default ExpensesContextProvider;
