import { Difficulty } from "./Difficulty";
import { ServingTypes } from "./Serving";

// -- selectors
export const selectServings = (state: State) => state.servings;
export const selectServingPreference = (state: State) => state.preferredServing;
export const selectCustomers = (state: State) => state.customers;
export const selectDifficultySetting = (state: State) => state.difficulty;
export const selectTimesRestarted = (state: State) => state.timesRestarted;

export const selectNormalizedServedCustomersRatio = (state: State) =>
  selectServings(state) / selectCustomers(state);
export const selectServedCustomersPercentage = (state: State) =>
  Math.ceil(selectNormalizedServedCustomersRatio(state) * 100);
export const selectProgress = (state: State) =>
  selectServings(state) / selectCustomers(state); // 0 to 1

export const startedServing = (state: State) => selectServings(state) > 0;
export const isGameWon = (state: State) =>
  selectServings(state) === selectCustomers(state);
export const isGameRunning = (state: State) =>
  startedServing(state) && !isGameWon(state);
export const isFirstOpen = (state: State) => selectTimesRestarted(state) === 0;
export const showTeachingBubble = (state: State) =>
  isFirstOpen(state) && !startedServing(state);

// -- actions
type Actions = ReturnType<
  | typeof addServing
  | typeof changeServing
  | typeof toggleDifficultyPress
  | typeof difficultySelected
  | typeof addCustomers
  | typeof restart
  | typeof playAgain
>;
export const addServing = () => <const>{ type: "ADD_SERVING" };

export const changeServing = (serving: ServingTypes) =>
  <const>{
    type: "CHANGE_SERVING",
    payload: { serving },
  };

export const toggleDifficultyPress = () =>
  <const>{ type: "TOGGLE_DIFFICULTY_PRESSED" };

export const difficultySelected = (difficulty: Difficulty) =>
  <const>{ type: "SELECT_DIFFICULTY", payload: { difficulty } };

export const addCustomers = (amount: number) =>
  <const>{ type: "ADD_CUSTOMERS", payload: { amount } };

export const restart = () => <const>{ type: "RESTART" };
export const playAgain = () => <const>{ type: "PLAY_AGAIN" };

// -- reducer
type Reducer = (state: State, action: Actions) => State;
export const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_SERVING":
      if (selectNormalizedServedCustomersRatio(state) >= 1) return state;
      if (selectServingPreference(state) === ServingTypes.DOUBLE_BEER)
        return { ...state, servings: selectServings(state) + 2 };
      else return { ...state, servings: selectServings(state) + 1 };

    case "CHANGE_SERVING":
      return { ...state, preferredServing: action.payload.serving };

    case "TOGGLE_DIFFICULTY_PRESSED":
      if (selectDifficultySetting(state) === Difficulty.BEGINNER)
        return { ...state, difficulty: Difficulty.NORMAL }; // Enable difficulty, default to normal
      return { ...state, difficulty: Difficulty.BEGINNER }; // "Disable" difficulty

    case "SELECT_DIFFICULTY":
      return { ...state, difficulty: action.payload.difficulty };

    case "ADD_CUSTOMERS":
      return { ...state, customers: state.customers + action.payload.amount };

    case "PLAY_AGAIN":
    case "RESTART":
      return {
        ...initialState,
        difficulty: state.difficulty,
        timesRestarted: state.timesRestarted + 1,
      };

    default:
      return state;
  }
};

export type State = typeof initialState;
export const initialState = {
  servings: 0,
  preferredServing: ServingTypes.LAGER,
  customers: 18,
  difficulty: Difficulty.EASY,
  timesRestarted: 0,
};
