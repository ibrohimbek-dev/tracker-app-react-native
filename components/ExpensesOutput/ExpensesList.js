import React from "react";
import ExpensesItem from "./ExpensesItem";
import { FlatList } from "react-native";

function renderExpenseItem(itemData) {
	return <ExpensesItem {...itemData.item} />;
}

const ExpensesList = ({ expenses }) => {
	return (
		<FlatList
			data={expenses}
			renderItem={renderExpenseItem}
			keyExtractor={(item) => item.id}
		/>
	);
};

export default ExpensesList;
