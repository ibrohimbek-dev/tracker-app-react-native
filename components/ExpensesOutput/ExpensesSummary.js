import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const ExpensesSummary = ({ expenses, periodName }) => {
	const expensesSum = expenses?.reduce((sum, expense) => {
		return sum + expense.amount;
	}, 0);

	return (
		<View style={styles.container}>
			<Text style={styles.period}>{periodName}</Text>
			<Text style={styles.sum}>${expensesSum?.toFixed(2)}</Text>
		</View>
	);
};

export default ExpensesSummary;

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: GlobalStyles.colors.primary50,
		borderRadius: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
		elevation: 4,
		shadowColor: GlobalStyles.colors.gray700,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4,
		shadowRadius: 4,
	},
	period: {
		fontSize: 14,
		color: GlobalStyles.colors.primary800,
		fontWeight: "500",
	},
	sum: {
		fontSize: 18,
		fontWeight: "bold",
		color: GlobalStyles.colors.primary700,
	},
});
