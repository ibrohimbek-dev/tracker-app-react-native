import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { formatDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

const ExpensesItem = ({ id, desc, amount, date }) => {
	const navigation = useNavigation();

	const expensePressHandler = () => {
		try {
			if (!navigation?.navigate) {
				throw new Error("Navigation not initialized");
			}
			navigation.navigate("ManageExpenses", {
				expenseId: id,
			});
		} catch (error) {
			console.error("Navigation error:", error);
			Alert.alert("Error", "Could not open expense details");
		}
	};

	return (
		<Pressable
			onPress={expensePressHandler}
			style={({ pressed }) => [styles.container, pressed && styles.pressed]}
			android_ripple={{ color: GlobalStyles.colors.primary100 }}
		>
			<View style={styles.innerContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.description}>{desc}</Text>
					<Text style={styles.date}>{formatDate(date)}</Text>
				</View>
				<View style={styles.amountContainer}>
					<Text style={styles.amount}>${amount?.toFixed(2)}</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default ExpensesItem;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 6,
		marginVertical: 4,
		borderRadius: 6,
		overflow: "hidden",
		backgroundColor: GlobalStyles.colors.primary500,
		elevation: 3,
		shadowColor: GlobalStyles.colors.gray700,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4,
		shadowRadius: 4,
	},
	pressed: {
		opacity: 0.75,
	},
	innerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
	},
	textContainer: {
		flex: 1,
	},
	description: {
		fontSize: 16,
		fontWeight: "bold",
		color: GlobalStyles.colors.primary50,
		marginBottom: 4,
	},
	date: {
		fontSize: 14,
		color: GlobalStyles.colors.primary100,
	},
	amountContainer: {
		justifyContent: "center",
		alignItems: "center",
		minWidth: 80,
		paddingHorizontal: 10,
		paddingVertical: 4,
		backgroundColor: "white",
		borderRadius: 4,
	},
	amount: {
		color: GlobalStyles.colors.primary500,
		fontWeight: "bold",
	},
});
