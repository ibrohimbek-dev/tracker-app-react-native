import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../../constants/colors";

const ErrorOverlay = ({ message }) => {
	return (
		<View style={styles.container}>
			<Text style={[styles.text, styles.title]}>An error occurred!</Text>
			<Text style={styles.text}>{message}</Text>
		</View>
	);
};

export default ErrorOverlay;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 24,
		backgroundColor: GlobalColors.colors.primary700,
	},

	text: {
		textAlign: "center",
		marginBottom: 4,
		color: GlobalColors.colors.error300,
	},

	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
