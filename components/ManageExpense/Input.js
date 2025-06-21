import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalColors } from "../../constants/colors";

const Input = ({ label, invalid, style, textInputConfig }) => {
	const inputStyles = [styles.input];

	if (textInputConfig && textInputConfig.multiline) {
		inputStyles.push(styles.inputMultiline);
	}

	if (invalid) {
		inputStyles.push(styles.invalidInput);
	}

	return (
		<View style={[styles.inputContainer, style]}>
			<Text style={[styles.label, invalid && styles.invalidLabel]}>
				{label}
			</Text>
			<TextInput
				style={inputStyles}
				placeholderTextColor={GlobalColors.colors.gray300}
				{...textInputConfig}
			/>
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	inputContainer: {
		marginHorizontal: 2,
		marginVertical: 4,
	},
	label: {
		fontSize: 14,
		color: "white",
		marginBottom: 2,
		fontWeight: "200",
	},
	input: {
		backgroundColor: GlobalColors.colors.primary50,
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 8,
		fontSize: 16,
		color: GlobalColors.colors.gray700,
		borderWidth: 1,
		borderColor: GlobalColors.colors.primary200,
	},

	inputMultiline: {
		minHeight: 100,
		textAlignVertical: "top",
	},

	invalidLabel: {
		color: GlobalColors.colors.error500,
	},

	invalidInput: {
		backgroundColor: GlobalColors.colors.error100,
	},
});
