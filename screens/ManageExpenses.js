import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalColors } from "../constants/colors";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, postExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpenses = ({ route, navigation }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState();
	const expensesCtx = useContext(ExpensesContext);

	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;

	const seletectedExpense = expensesCtx.expenses.find(
		(expense) => expense.id === editedExpenseId
	);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? "Edit Expense" : "Add Expense",
		});
	}, [navigation, isEditing]);

	async function deleteExpenseHandler() {
		setIsSubmitting(true);
		try {
			expensesCtx.deleteExpense(editedExpenseId);
			await deleteExpense(editedExpenseId);
			navigation.goBack();
		} catch (error) {
			setError("Could not delete expense - please try again later!");
		}
		setIsSubmitting(false);
	}

	function cancelExpenseHandler() {
		navigation.goBack();
	}

	async function confirmExpenseHandler(expenseData) {
		setIsSubmitting(true);
		try {
			if (isEditing) {
				expensesCtx.updateExpense(editedExpenseId, expenseData);
				await updateExpense(editedExpenseId, expenseData);
			} else {
				const id = await postExpense(expenseData); // Assuming postExpense is async
				expensesCtx.addExpense({ ...expenseData, id: id });
			}

			navigation.goBack();
		} catch (error) {
			setError("Could not save date - please try again later!");
			setIsSubmitting(false);
		}
	}

	if (error && !isSubmitting) {
		return <ErrorOverlay message={error} />;
	}

	if (isSubmitting) {
		return <LoadingOverlay />;
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
