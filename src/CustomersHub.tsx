import {
  Persona as PersonaTile,
  PersonaInitialsColor,
  PersonaSize,
} from "@fluentui/react";
import React, { useCallback, useEffect, useState } from "react";
import { animated, config, useTransition } from "react-spring";
import { of, timer, interval } from "rxjs";
import { mapTo, repeat, switchMap } from "rxjs/operators";
import { Difficulty, createTimers } from "./Difficulty";
import { id } from "./utils";

type Props = {
  difficulty: Difficulty;
  onAddCustomers: (amount: number) => void;
  gameRunning?: boolean;
};
export function CustomersHub(props: Props) {
  const { difficulty, onAddCustomers, gameRunning } = props;

  const [personas, setPersonas] = useState<Persona[]>([]);
  const addPersona = useCallback(
    () => setPersonas((state) => [...state, createPersona()]),
    []
  );
  const removePersona = useCallback(
    (p: Persona) => setPersonas((s) => s.filter((it) => it.id !== p.id)),
    []
  );

  useEffect(() => {
    if (!gameRunning) return;

    const { damage, interval } = createTimers(difficulty);
    const customer$ = of("").pipe(
      switchMap(() => timer(interval()).pipe(mapTo(damage()))),
      repeat()
    );
    const sub = customer$.subscribe((damage) => {
      onAddCustomers(damage);
      addPersona();
    });

    return () => sub.unsubscribe();
  }, [addPersona, difficulty, gameRunning, onAddCustomers]);

  const transitionPersonas = useTransition(personas, (p) => p.id, {
    from: {
      opacity: 0.5,
      transform: "translate(5px, 15px) scale(0.5)",
    },
    enter: {
      transform: "translate(0px, 15px) scale(1)",
      opacity: 1,
    },
    leave: {
      transform: "translate(0px, 0px) scale(1)",
      opacity: 0,
    },

    config: config.stiff,
    // @ts-ignore works, error in types
    onRest: removePersona,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        right: 0,
        top: 45,
      }}
    >
      {transitionPersonas.map(({ item, props, key, state }) => (
        <animated.div key={item.id} style={{ ...props }}>
          <PersonaTile
            size={PersonaSize.size24}
            initialsColor={PersonaInitialsColor.orange}
          />
        </animated.div>
      ))}
    </div>
  );
}

type Persona = { id: string };
const createPersona = (): Persona => ({ id: id() });
