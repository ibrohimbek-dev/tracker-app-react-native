import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import { GlobalColors } from "./constants/colors";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";
import ManageExpenses from "./screens/ManageExpenses";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
	const navigation = useNavigation();
	return (
		<BottomTabs.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: GlobalColors.colors.primary500,
				},
				headerTintColor: "white",
				tabBarStyle: { backgroundColor: GlobalColors.colors.primary500 },
				tabBarActiveTintColor: GlobalColors.colors.accent500,
				headerRight: () => {
					return (
						<IconButton
							icon="add"
							size={24}
							color="white"
							onPress={() => {
								navigation.navigate("ManageExpenses");
							}}
						/>
					);
				},
			}}
		>
			<BottomTabs.Screen
				name="RecentExpenses"
				component={RecentExpenses}
				options={{
					title: "Recent Expenses",
					tabBarLabel: "Recent",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="hourglass" size={size} color={color} />
					),
				}}
			/>
			<BottomTabs.Screen
				name="AllExpenses"
				component={AllExpenses}
				options={{
					title: "All Expenses",
					tabBarLabel: "All",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="calendar" size={size} color={color} />
					),
				}}
			/>
		</BottomTabs.Navigator>
	);
}

export default function App() {
	return (
		<>
			<StatusBar style="light" />
			<ExpensesContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: { backgroundColor: GlobalColors.colors.primary500 },
							headerTintColor: "white",
						}}
					>
						<Stack.Screen
							name="ExpensesOverview"
							component={ExpensesOverview}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="ManageExpenses"
							component={ManageExpenses}
							options={{ presentation: "modal" }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ExpensesContextProvider>
		</>
	);
}
