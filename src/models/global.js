export default {
	state: {
		count: 0
	},
	effects: {

	},
	reducers: {
		changeState(state, action) {
			return {
				...state,
				...action
			};
		}
	}
};
