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
  selectServingPreference,
  selectDifficultySetting,
  addCustomers,
  isGameRunning,
  isGameWon,
  restart,
  playAgain,
  showTeachingBubble,
} from "./state";
import { Scaffold } from "./Scaffold";
import { BeerTap } from "./BeerTap";
import { CustomersHub } from "./CustomersHub";
import { Stack } from "@fluentui/react";
import { VictoryView } from "./VictoryView";

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
            gameRunning={isGameRunning(state)}
          />
          <button onClick={() => dispatch(restart())}>reset</button>
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
            showBubble={showTeachingBubble(state)}
            onClick={() => dispatch(addServing())}
          />
          {isGameWon(state) && (
            <VictoryView onPlayAgain={() => dispatch(playAgain())} />
          )}
        </>
      }
    />
  );
}

export default App;
