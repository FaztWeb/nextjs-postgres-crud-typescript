import { useState } from 'react';

/**
 * **useLoading** encapsulates the logic for displaying any loading component
 * during an asynchronous operation (i.e. fetch)
 * @param action is an async function that triggers loading by starting a background task.
 * The function should handle all the time consuming processes, because
 * the loading will be reset when the function returns
 *
 * @returns **doAction** a wrapper function for providing the necessary parameters for the task.
 * When called it also sets loading to true to indicate the background work has started.
 * @returns **loading** the state of the task
 */
const useLoading = <T, R>(action: (args: T) => Promise<R>) => {
  // loading is set to false, as the async action may not start immediately
  const [loading, setLoading] = useState(false);

  /**
   * **doAction** is a wrapper function for starting the process described by **action**.
   * @param args additional function parameters for running the task
   * @returns the data received from the task
   */
  const doAction = (args: T) => {
    setLoading(true);
    return action(args).then((response: R) => {
      setLoading(false);
      return response;
    });
  };

  return { doAction, loading };
};
export default useLoading;
