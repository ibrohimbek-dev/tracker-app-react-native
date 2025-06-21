import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../../constants/colors";

const Button = ({ children, onPress, mode, style }) => {
	return (
		<View style={style}>
			<Pressable
				onPressIn={onPress}
				style={({ pressed }) => pressed && styles.pressed}
			>
				<View style={[styles.button, mode === "flat" && styles.flat]}>
					<Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
						{children}
					</Text>
				</View>
			</Pressable>
		</View>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		borderRadius: 4,
		padding: 8,
		backgroundColor: GlobalColors.colors.success400,
	},
	flat: {
		backgroundColor: GlobalColors.colors.error100,
	},

	buttonText: {
		color: "white",
		textAlign: "center",
	},

	flatText: {
		color: "black",
	},

	pressed: {
		opacity: 0.75,
		backgroundColor: GlobalColors.colors.primary100,
		borderRadius: 4,
	},
});
