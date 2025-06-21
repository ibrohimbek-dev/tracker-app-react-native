import React, { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalColors } from "../constants/colors";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpenses = ({ route, navigation }) => {
	const expenseContext = useContext(ExpensesContext);

	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;

	const seletectedExpense = expenseContext.expenses.find(
		(expense) => expense.id === editedExpenseId
	);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? "Edit Expense" : "Add Expense",
		});
	}, [navigation, isEditing]);

	function deleteExpenseHandler() {
		expenseContext.deleteExpense(editedExpenseId);
		navigation.goBack();
	}

	function cancelExpenseHandler() {
		navigation.goBack();
	}

	function confirmExpenseHandler(expenseData) {
		if (isEditing) {
			expenseContext.updateExpense(editedExpenseId, expenseData);
		} else {
			expenseContext.addExpense(expenseData);
		}

		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<ExpenseForm
				defaultValues={seletectedExpense}
				onSubmit={confirmExpenseHandler}
				onCancel={cancelExpenseHandler}
				submitButtonLabel={isEditing ? "Update" : "Add"}
			/>

			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon="trash"
						color={GlobalColors.colors.error500}
						size={36}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
};

export default ManageExpenses;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalColors.colors.primary800,
	},

	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalColors.colors.primary200,
		alignItems: "center",
	},
});
