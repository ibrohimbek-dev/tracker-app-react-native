import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
	const [isFetching, setIsFetching] = useState(true);
	const [error, setError] = useState();

	const expensesCtx = useContext(ExpensesContext);

	useEffect(() => {
		const loadExpenses = async () => {
			setIsFetching(true);
			try {
				const fetchedExpenses = await getExpenses();
				expensesCtx.setExpenses(fetchedExpenses);
			} catch (error) {
				setError("Could not fetch expenses!");
			}
			setIsFetching(false);
		};
		loadExpenses();
	}, []);

	if (error && !isFetching) {
		return <ErrorOverlay message={error} />;
	}

	if (isFetching) {
		return <LoadingOverlay message={error} />;
	}

	const recentExpenses = expensesCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);
		return expense.date >= date7DaysAgo && expense.date <= today;
	});

	return (
		<ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
	);
};

export default RecentExpenses;
