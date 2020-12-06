import React, { useCallback, useReducer } from "react";
import "./App.css";
import { initializeIcons } from "office-ui-fabric-react";
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
  selectDifficultySetting,
  addCustomers,
  selectGameRunning,
} from "./state";
import { Scaffold } from "./Scaffold";
import { BeerTap } from "./BeerTap";
import { CustomersHub } from "./CustomersHub";
import { Stack } from "@fluentui/react";

initializeIcons();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addMoreCustomers = useCallback((customers: number) => {
    dispatch(addCustomers(customers));
  }, []);
  return (
    <Scaffold
      header={
        <Stack verticalAlign="end" style={{ position: "relative" }}>
          <GameProgress progress={selectProgress(state)} />
          <CustomersHub
            difficulty={selectDifficultySetting(state)}
            onAddCustomers={addMoreCustomers}
            gameRunning={selectGameRunning(state)}
          />
        </Stack>
      }
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

          <BeerTap
            startedServing={selectStartedServing(state)}
            onClick={() => dispatch(addServing())}
          />
        </>
      }
    />
  );
}

export default App;
