import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';
import { createDemoState, demoReducer, type DemoAction, type DemoState } from './model';
const StateContext = createContext<DemoState | null>(null);
const DispatchContext = createContext<Dispatch<DemoAction> | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(demoReducer, undefined, createDemoState);
  return <StateContext value={state}><DispatchContext value={dispatch}>{children}</DispatchContext></StateContext>;
}
export function useDemoState() {
  const state = useContext(StateContext);
  if (!state) throw new Error('DemoProvider ausente');
  return state;
}
export function useDemoDispatch() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) throw new Error('DemoProvider ausente');
  return dispatch;
}
