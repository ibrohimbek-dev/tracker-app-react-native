import axios from "axios";

const BACKEND_URL = "https://tracker-app-rn-default-rtdb.firebaseiocom";

export async function postExpense(expenseData) {
	const response = await axios.post(
		`${BACKEND_URL}/expenses.json`,
		expenseData
	);
	const id = response.data.name;
	return id;
}

export async function getExpenses() {
	const response = await axios.get(`${BACKEND_URL}/expenses.json`);

	const expenses = [];

	for (const key in response.data) {
		const expenseObj = {
			id: key,
			amount: response.data[key].amount,
			date: new Date(response.data[key].date),
			desc: response.data[key].desc,
		};

		expenses.push(expenseObj);
	}

	return expenses;
}

export function updateExpense(id, expenseData) {
	return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
	return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
