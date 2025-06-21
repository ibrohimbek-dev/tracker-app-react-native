import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalColors } from "../../constants/colors";

function ExpensesOutput({ expenses, expensesPeriod }) {
	const totalAmount = expenses?.reduce(
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
				<Text style={styles.footerAmount}>${totalAmount?.toFixed(2)}</Text>
			</View>
		</View>
	);
}

export default ExpensesOutput;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalColors.colors.primary50,
	},
	summaryContainer: {
		padding: 10,
		backgroundColor: GlobalColors.colors.primary100,
		borderBottomWidth: 1,
		borderBottomColor: GlobalColors.colors.primary200,
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
		color: GlobalColors.colors.gray700,
		fontWeight: "bold",
		marginBottom: 8,
	},
	emptySubtext: {
		fontSize: 14,
		color: GlobalColors.colors.gray500,
	},
	footerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		backgroundColor: GlobalColors.colors.primary200,
		borderTopWidth: 1,
		borderTopColor: GlobalColors.colors.primary400,
	},
	footerText: {
		fontSize: 16,
		color: GlobalColors.colors.primary800,
		fontWeight: "bold",
	},
	footerAmount: {
		fontSize: 18,
		color: GlobalColors.colors.primary700,
		fontWeight: "bold",
	},
});
