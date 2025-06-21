import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({
	icon,
	size = 24,
	color = GlobalColors.colors.primary50,
	onPress,
}) => {
	return (
		<Pressable
			onPressIn={onPress}
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
			android_ripple={{
				color: GlobalColors.colors.primary100,
				borderless: true,
				radius: size + 8,
			}}
		>
			<View style={styles.iconContainer}>
				<Ionicons name={icon} color={color} size={size} style={styles.icon} />
			</View>
		</Pressable>
	);
};

export default IconButton;

const styles = StyleSheet.create({
	button: {
		borderRadius: 24,
		padding: 8,
		marginHorizontal: 8,
		marginVertical: 2,
		overflow: "hidden",
	},
	pressed: {
		opacity: 0.7,
	},
	iconContainer: {
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
	},
});
