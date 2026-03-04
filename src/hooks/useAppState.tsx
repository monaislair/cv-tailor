import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";
import type { AppState, AppAction } from "@/types";

const initialState: AppState = {
  masterProfile: null,
  currentJob: null,
  generatedCV: null,
  interviewPrep: null,
  isLoading: false,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_PROFILE":
      return { ...state, currentJob: null, generatedCV: null, interviewPrep: null, masterProfile: action.payload };
    case "SET_JOB":
      return { ...state, generatedCV: null, interviewPrep: null, currentJob: action.payload };
    case "SET_CV":
      return { ...state, generatedCV: action.payload };
    case "SET_PREP":
      return { ...state, interviewPrep: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <AppContext value={{ state, dispatch }}>{children}</AppContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppState(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used inside AppProvider");
  return ctx;
}
