import React, { useReducer } from "react";
import "./App.css";
import {
  initializeIcons,
} from "office-ui-fabric-react";
import { ServingsHub } from "./ServingsHub";
import { GameProgress } from "./GameProgress";
import {
  reducer,
  selectServings,
  addServing,
  initialState,
  selectProgress,
  selectStartedServing,
  selectServingPreference,
} from "./state";
import { Scaffold } from "./Scaffold";
import { TapLever } from "./TapLever";

initializeIcons();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Scaffold
      header={<GameProgress progress={selectProgress(state)} />}
      body={
        <>
          <ServingsHub
            totalServings={selectServings(state)}
            preference={selectServingPreference(state)}
          />
          {/* <
              <DefaultButton onClick={() => dispatch(addCustomers(5))}>
                Increase capacity
              </DefaultButton>
              */}
          <TapLever
            startedServing={selectStartedServing(state)}
            onClick={() => dispatch(addServing())}
          />
        </>
      }
    />
  );
}

export default App;
