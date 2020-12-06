import {
  Persona as PersonaTile,
  PersonaInitialsColor,
  PersonaSize,
  Stack,
} from "@fluentui/react";
import React, { useCallback, useEffect, useState } from "react";
import { animated, config, useTransition } from "react-spring";
import { of, timer } from "rxjs";
import { mapTo, repeat, switchMap } from "rxjs/operators";
import { Difficulty, createTimers } from "./Difficulty";
import { getRandomInt, id } from "./utils";

type Props = {
  difficulty: Difficulty;
  onAddCustomers: (amount: number) => void;
  gameRunning?: boolean;
};
export function CustomersHub(props: Props) {
  const { difficulty, onAddCustomers, gameRunning } = props;

  const [personas, setPersonas] = useState<Persona[]>([]);
  const addPersona = useCallback(
    (amount: number) =>
      setPersonas((state) => [...state, createPersona(amount)]),
    []
  );
  const removePersona = (p: Persona) =>
    setPersonas((state) => state.filter((it) => it.id !== p.id));

  useEffect(() => {
    if (!gameRunning) return;

    const { customers, interval } = createTimers(difficulty);

    const customer$ = of("").pipe(
      switchMap(() => {
        const inter = interval();
        const cust = customers();
        console.log("interval: ", inter, "customers: ", cust);
        return timer(inter).pipe(mapTo(cust));
      }),
      repeat()
    );

    const sub = customer$.subscribe((amount) => {
      console.log(amount);
      onAddCustomers(amount);
      addPersona(amount);
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
    onRest: (persona: Persona) => {
      // onAddCustomers(persona.amount);
      removePersona(persona);
    },
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
        <animated.div key={item.id} style={props}>
          <PersonaTile
            size={PersonaSize.size24}
            initialsColor={PersonaInitialsColor.darkRed}
          />
        </animated.div>
      ))}
    </div>
  );
}

type Persona = { id: string; amount: number };
const createPersona = (amount: number): Persona => ({ id: id(), amount });
