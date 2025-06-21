import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalColors } from "../../constants/colors";

const LoadingOverlay = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="white" />
		</View>
	);
};

export default LoadingOverlay;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 24,
		backgroundColor: GlobalColors.colors.primary700,
	},
});
