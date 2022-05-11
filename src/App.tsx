import React, { useCallback, useReducer } from 'react';
import './App.css';
import { initializeIcons } from 'office-ui-fabric-react';

import { GameProgressView } from './progress/GameProgress';
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
  difficultySelected,
  selectCustomers,
  changePubCrawlCountdown
} from './state';
import { AppScaffold } from './ui-kit/AppScaffold';
import { BeerTap } from './taproom/BeerTap';
import { CustomersHub } from './customers/CustomersHub';
import { Stack } from '@fluentui/react';
import { VictoryView } from './progress/VictoryView';
import { ServingsHub } from './taproom/ServingsHub';
import { Difficulty } from './customers/Difficulty';

initializeIcons();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addMoreCustomers = useCallback((customers: number) => {
    dispatch(addCustomers(customers));
  }, []);

  const changeDifficulty = useCallback((difficulty: Difficulty) => {
    dispatch(difficultySelected(difficulty));
  }, []);

  const changeCountdown = useCallback(
    (v: number) => dispatch(changePubCrawlCountdown(v)),
    []
  );

  const activeDifficulty = selectDifficultySetting(state);
  return (
    <AppScaffold
      header={
        <Stack verticalAlign="end" style={{ position: 'relative' }}>
          <div
            style={{
              color: state.difficulty === Difficulty.PUB_CRAWL ? 'red' : 'initial'
            }}>
            Difficulty Mode {state.difficulty}
          </div>
          <div>Pub Crawl starts in {state.pubCrawlCountdown}s</div>
          <GameProgressView progress={selectProgress(state)} />
          <CustomersHub
            customers={selectCustomers(state)}
            difficulty={selectDifficultySetting(state)}
            onAddCustomers={addMoreCustomers}
            gameRunning={isGameRunning(state)}
            onChangeDifficulty={changeDifficulty}
            onChangeCountdown={changeCountdown}
          />
          <button onClick={() => dispatch(restart())}>reset</button>
          <button
            style={{
              backgroundColor:
                activeDifficulty === Difficulty.BEGINNER ? 'orange' : 'initial'
            }}
            onClick={() => dispatch(difficultySelected(Difficulty.BEGINNER))}>
            Beginner
          </button>
          <button
            style={{
              backgroundColor: activeDifficulty === Difficulty.EASY ? 'orange' : 'initial'
            }}
            onClick={() => dispatch(difficultySelected(Difficulty.EASY))}>
            Easy
          </button>
          <button
            style={{
              backgroundColor:
                activeDifficulty === Difficulty.NORMAL ? 'orange' : 'initial'
            }}
            onClick={() => dispatch(difficultySelected(Difficulty.NORMAL))}>
            Medium
          </button>
          <button
            style={{
              backgroundColor: activeDifficulty === Difficulty.HARD ? 'orange' : 'initial'
            }}
            onClick={() => dispatch(difficultySelected(Difficulty.HARD))}>
            Hard
          </button>
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
          {isGameWon(state) && <VictoryView onPlayAgain={() => dispatch(playAgain())} />}
        </>
      }
    />
  );
}

export default App;
