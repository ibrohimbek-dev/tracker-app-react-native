import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
	{
		id: "e1",
		desc: "Running shoes",
		amount: 89.99,
		date: new Date("2023-01-15"),
	},
	{
		id: "e2",
		desc: "Groceries",
		amount: 127.5,
		date: new Date("2023-02-03"),
	},
	{
		id: "e3",
		desc: "Movie tickets",
		amount: 24.0,
		date: new Date("2023-02-18"),
	},
	{
		id: "e4",
		desc: "Dinner at Italian restaurant",
		amount: 65.8,
		date: new Date("2023-03-05"),
	},
	{
		id: "e5",
		desc: "New phone case",
		amount: 19.99,
		date: new Date("2023-03-22"),
	},
	{
		id: "e6",
		desc: "Gym membership",
		amount: 45.0,
		date: new Date("2023-04-01"),
	},
	{
		id: "e7",
		desc: "Book purchase",
		amount: 14.95,
		date: new Date("2023-04-12"),
	},
	{
		id: "e8",
		desc: "Car maintenance",
		amount: 220.0,
		date: new Date("2023-05-08"),
	},
	{
		id: "e9",
		desc: "Birthday gift",
		amount: 75.25,
		date: new Date("2023-05-20"),
	},
	{
		id: "e10",
		desc: "Summer clothes",
		amount: 132.4,
		date: new Date("2023-06-05"),
	},
];

function ExpensesOutput({
	expenses = DUMMY_EXPENSES,
	expensesPeriod = "Last 7 Days",
}) {
	const totalAmount = expenses.reduce(
		(sum, expense) => sum + expense.amount,
		0
	);
	const isEmpty = expenses?.length === 0;

	return (
		<View style={styles.container}>
			<View style={styles.summaryContainer}>
				<ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
			</View>

			<View style={styles.contentContainer}>
				{isEmpty ? (
					<View style={styles.emptyState}>
						<Text style={styles.emptyText}>No expenses recorded</Text>
						<Text style={styles.emptySubtext}>
							Add some expenses to get started
						</Text>
					</View>
				) : (
					<ExpensesList expenses={expenses} />
				)}
			</View>

			<View style={styles.footerContainer}>
				<Text style={styles.footerText}>TOTAL SPENT:</Text>
				<Text style={styles.footerAmount}>${totalAmount.toFixed(2)}</Text>
			</View>
		</View>
	);
}

export default ExpensesOutput;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colors.primary50,
	},
	summaryContainer: {
		padding: 10,
		backgroundColor: GlobalStyles.colors.primary100,
		borderBottomWidth: 1,
		borderBottomColor: GlobalStyles.colors.primary200,
	},
	contentContainer: {
		flex: 1,
		paddingHorizontal: 4,
		paddingTop: 16,
	},
	emptyState: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyText: {
		fontSize: 18,
		color: GlobalStyles.colors.gray700,
		fontWeight: "bold",
		marginBottom: 8,
	},
	emptySubtext: {
		fontSize: 14,
		color: GlobalStyles.colors.gray500,
	},
	footerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		backgroundColor: GlobalStyles.colors.primary200,
		borderTopWidth: 1,
		borderTopColor: GlobalStyles.colors.primary400,
	},
	footerText: {
		fontSize: 16,
		color: GlobalStyles.colors.primary800,
		fontWeight: "bold",
	},
	footerAmount: {
		fontSize: 18,
		color: GlobalStyles.colors.primary700,
		fontWeight: "bold",
	},
});
