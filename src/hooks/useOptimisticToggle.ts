import { useState, useRef, SyntheticEvent } from "react";

function noopPromise() {
  /** No Operation that Returns a Promise */
  return Promise.resolve();
}
type Props = {
  /** Initial Value of the Checkbox */
  initialValue?: boolean;
  /** On-change handler that returns a Promise Object */
  action?: (toggleState: boolean, event: SyntheticEvent) => Promise<unknown>;
};

function useOptimisticToggle({
  initialValue = false,
  action = noopPromise,
}: Props): [boolean, (event: SyntheticEvent) => void] {
  const [stateOptimistic, setStateOptimistic] = useState<boolean>(initialValue);
  const refCurrentPromise = useRef<Promise<unknown>>();
  const refFailedCount = useRef(0);

  function handleToggle(event: SyntheticEvent) {
    const newToggled = !stateOptimistic;
    setStateOptimistic(newToggled);

    const actionPromise = action(newToggled, event);

    refCurrentPromise.current = actionPromise;

    actionPromise.catch(() => {
      refFailedCount.current += 1;
      if (refCurrentPromise.current === actionPromise) {
        setStateOptimistic((prevState) => {
          return refFailedCount.current % 2 === 0 ? prevState : !prevState;
        });
        refFailedCount.current = 0;
      }
    });
  }

  return [stateOptimistic, handleToggle];
}

export default useOptimisticToggle;
