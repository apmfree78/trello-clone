import { initialState } from "./cardSlice";
const KEY = 'redux';


// getting state from localStorage
export function loadState() {
  const serializedState = localStorage.getItem(KEY);

  if (!serializedState) return initialState;

  return JSON.parse(serializedState);
}

// saving state to localStorage
export function saveState(state: any) {
  const serializedState = JSON.stringify(state);
  localStorage.setItem(KEY, serializedState);
}
