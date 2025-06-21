import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { formatDate } from "../../util/date";
import { GlobalColors } from "../../constants/colors";

const ExpenseForm = ({
	onCancel,
	onSubmit,
	submitButtonLabel,
	defaultValues,
}) => {
	const [inputs, setInputs] = useState({
		amount: {
			value: defaultValues ? defaultValues.amount.toString() : "",
			isValid: true,
		},
		date: {
			value: defaultValues ? formatDate(defaultValues.date) : "",
			isValid: true,
		},
		desc: {
			value: defaultValues ? defaultValues.desc : "",
			isValid: true,
		},
	});

	function inputChangedHandler(inputIdentifier, enteredValue) {
		setInputs((currentInputs) => {
			// Special handling for amount field
			if (inputIdentifier === "amount") {
				// Remove all non-digit and non-decimal characters, allow only one decimal point
				const cleanedValue = enteredValue
					.replace(/[^0-9.]/g, "") // Remove non-digits and non-dots
					.replace(/(\..*)\./g, "$1"); // Allow only one decimal point

				return {
					...currentInputs,
					[inputIdentifier]: {
						value: cleanedValue,
						isValid: true,
					},
				};
			}

			// Special handling for date field
			if (inputIdentifier === "date") {
				// Remove all non-digit characters
				const cleanedValue = enteredValue.replace(/\D/g, "");

				// Add dashes automatically
				let formattedValue = cleanedValue;
				if (cleanedValue.length > 4) {
					formattedValue = `${cleanedValue.slice(0, 4)}-${cleanedValue.slice(
						4,
						6
					)}`;
				}
				if (cleanedValue.length > 6) {
					formattedValue += `-${cleanedValue.slice(6, 8)}`;
				}

				// Limit to 10 characters (YYYY-MM-DD)
				return {
					...currentInputs,
					[inputIdentifier]: {
						value: formattedValue.slice(0, 10),
						isValid: true,
					},
				};
			}

			return {
				...currentInputs,
				[inputIdentifier]: { value: enteredValue, isValid: true },
			};
		});
	}

	function submitHandler() {
		const expenseData = {
			amount: +inputs.amount.value,
			date: new Date(inputs.date.value),
			desc: inputs.desc.value,
		};

		const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
		const dateIsValid =
			expenseData.date instanceof Date && !isNaN(expenseData.date);
		const descIsValid = expenseData.desc.trim().length > 0;

		if (!amountIsValid || !dateIsValid || !descIsValid) {
			// Alert.alert("Invalid input", "Please check your input values");
			setInputs((curInputs) => {
				return {
					amount: { value: curInputs.amount.value, isValid: amountIsValid },
					date: { value: curInputs.date.value, isValid: dateIsValid },
					desc: { value: curInputs.desc.value, isValid: descIsValid },
				};
			});
			return;
		}

		onSubmit(expenseData);
	}

	const formIsInvalid =
		!inputs.amount.isValid || !inputs.date.isValid || !inputs.desc.isValid;

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.inputRow}>
				<Input
					style={styles.rowInput}
					label={"Amount"}
					invalid={!inputs.amount.isValid}
					textInputConfig={{
						placeholder: "Amount",
						keyboardType: "decimal-pad", // Fixed typo and changed to decimal-pad
						onChangeText: inputChangedHandler.bind(this, "amount"),
						value: inputs.amount.value,
					}}
				/>
				<Input
					label={"Date"}
					style={styles.rowInput}
					invalid={!inputs.date.isValid}
					textInputConfig={{
						placeholder: "YYYY-MM-DD",
						maxLength: 10,
						keyboardType: "number-pad", // Changed from keyBoardType to keyboardType
						onChangeText: inputChangedHandler.bind(this, "date"),
						value: inputs.date.value,
					}}
				/>
			</View>
			<Input
				label={"Description"}
				invalid={!inputs.desc.isValid}
				textInputConfig={{
					multiline: true,
					placeholder: "Description",
					// autoCorrect: false // default is true
					// autoCapitalize: "none", // default is sentences
					onChangeText: inputChangedHandler.bind(this, "desc"),
					value: inputs.desc.value,
				}}
			/>

			{formIsInvalid && (
				<Text style={styles.errorText}>
					Invalid input values - please check your entered data!
				</Text>
			)}

			<View style={styles.buttons}>
				<Button style={styles.button} mode="flat" onPress={onCancel}>
					Cancel
				</Button>
				<Button style={styles.button} onPress={submitHandler}>
					{submitButtonLabel}
				</Button>
			</View>
		</View>
	);
};

export default ExpenseForm;

const styles = StyleSheet.create({
	form: {
		marginTop: 30,
	},

	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		textAlign: "center",
		marginVertical: 8,
	},

	inputRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	rowInput: {
		flex: 1,
	},

	errorText: {
		textAlign: "center",
		color: GlobalColors.colors.error500,
		margin: 8,
	},

	buttons: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 4,
	},

	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
});
