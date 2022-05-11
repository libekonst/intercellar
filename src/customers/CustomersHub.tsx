import {
  Persona as PersonaTile,
  PersonaInitialsColor,
  PersonaSize
} from '@fluentui/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { animated, config, useTransition } from 'react-spring';
import { Difficulty } from './Difficulty';
import { id } from '../utils/utils';
import { Absolute } from '../ui-kit/Absolute';
import { Damager } from './damager/Damager';
import {
  LowDamageStrategy,
  HardDamageStrategy,
  MediumDamageStrategy,
  SteadyLowDamageStrategy,
  PubCrawlDamageStrategy
} from './damager/damage-strategies';
import { Column } from '../ui-kit/Layout';
import { ProgressDamage } from './ProgressDamage';

type Props = {
  difficulty: Difficulty;
  onAddCustomers: (amount: number) => void;
  onChangeDifficulty: (difficulty: Difficulty) => void;
  gameRunning?: boolean;
  customers: number;
  onChangeCountdown: (v: number) => void;
};
export function CustomersHub(props: Props) {
  const {
    difficulty,
    onAddCustomers,
    gameRunning,
    onChangeDifficulty,
    customers,
    onChangeCountdown
  } = props;

  const [personasUI, setPersonasUI] = useState<Persona[]>([]);
  const addPersonaUI = useCallback(
    () => setPersonasUI((state) => [...state, new Persona()]),
    []
  );
  const removePersonaUI = useCallback(
    (p: Persona) => setPersonasUI((s) => s.filter((it) => it.id !== p.id)),
    []
  );

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) firstRender.current = false;
    else addPersonaUI();
  }, [addPersonaUI, customers]);

  const transitionPersonas = useTransition(personasUI, (p) => p.id, {
    from: {
      opacity: 0.5,
      transform: 'translate(5px, 15px) scale(0.5)'
    },
    enter: {
      transform: 'translate(0px, 15px) scale(1)',
      opacity: 1
    },
    leave: {
      transform: 'translate(0px, 0px) scale(1)',
      opacity: 0
    },

    config: config.stiff,
    // @ts-ignore works, error in types
    onRest: removePersonaUI
  });

  return (
    <ProgressDamage
      onDamageInflicted={(damage) => onAddCustomers(damage)}
      difficulty={difficulty}
      gameRunning={gameRunning}
      onChangeDifficulty={onChangeDifficulty}
      setCountdown={onChangeCountdown}>
      <Absolute right={0} top={45}>
        <Column>
          {transitionPersonas.map(({ item, props, key, state }) => (
            <animated.div key={item.id} style={{ ...props }}>
              <PersonaTile
                size={PersonaSize.size24}
                initialsColor={PersonaInitialsColor.orange}
              />
            </animated.div>
          ))}
        </Column>
      </Absolute>
    </ProgressDamage>
  );
}

// type Persona = { id: string };
// const createPersona = (): Persona => ({ id: id() });

class Persona {
  readonly id = id();
}
