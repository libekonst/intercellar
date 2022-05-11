import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { timer } from 'rxjs';
import { reducer, initialState, startedReloading, finishedReloading } from '../state';

export function GameManager() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.remainingServingsUntilReload === 0) dispatch(startedReloading());
  }, [state.remainingServingsUntilReload]);

  useEffect(() => {
    async function waitThenReload() {
      await timer(5000).toPromise();
      dispatch(finishedReloading());
    }
    if (state.reloading) waitThenReload();
  }, [state.reloading]);
}

const Context = createContext({});

export const useGameManager = () => useContext(Context);
