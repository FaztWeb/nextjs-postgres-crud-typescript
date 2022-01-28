import { Subject, ReplaySubject } from 'rxjs';

export type providedField = {
  field: string;
  hasProvided: boolean;
};

/**
 * **ids** will contain the input fields that may need a status icon, for displaying
 * information about the state of the input (e.g. saved, processed, no changes, etc)
 */
export const ids = ['info', 'name', 'description'];

/**
 * **modal$** opens and closes the modal on button click.
 */
export const modal$ = new Subject<boolean>();

/**
 * **showLoading$** will ensure the user can see an indicator
 * that their request is being processed by the backend. To do this, we toggle
 * the component, based on a few calculations, for keeping a consistent UI
 * (prevent content flashes).
 */
export const showLoading$ = new Subject<boolean>();

/**
 * **input$** sends the payload received from input form,
 * to query the results (from the arcGIS external database)
 */
export const input$ = new Subject<string>();

/**
 * **churchToModify$** helps the modal be aware which church
 * the user intends to modify.
 *
 * We subscribe to this observer from the modal, through the useEffect hook.
 * But when the modify button is clicked (and churchToModify$ emits), the modal may NOT be mounted yet
 * (and the subscription not set up) resulting in the data being lost. Hence we
 * use the **ReplaySubject** to make sure that even late subscribers (such as the modal)
 * still receive the last value emitted from the observer
 */
export const churchToModify$ = new ReplaySubject<string>(1);

/**
 * **providedInfo$** changes the style of the icon based on the information that the user has
 * provided. For example if no changes are detected after clicking the input field, the icon's tooltip
 * will say : "No changes detected", informing the user that their action did not affect the state of the input.
 */
export const providedInfo$ = new Subject<providedField>();

export type iconStatus = {
  payload: string;
  showFor: number;
};

export const change$ = ids.reduce<Record<string, Subject<iconStatus>>>(
  (previousValue: Record<string, Subject<iconStatus>>, currentValue) => {
    previousValue[currentValue] = new Subject<iconStatus>();
    return previousValue;
  },
  {} as Record<string, Subject<iconStatus>>
);

export const trigger$ = ids.reduce<Record<string, Subject<iconStatus>>>(
  (previousValue: Record<string, Subject<iconStatus>>, currentValue) => {
    previousValue[currentValue] = new Subject<iconStatus>();
    return previousValue;
  },
  {} as Record<string, Subject<iconStatus>>
);

/**
 * Push any set of files (that resulted from the user deleting or adding them) to the component that
 * will eventually post them. Because processing the payload may not be done when the data is emitted,
 * we will keep the latest set of data memoized inside **imageSupplier$**. This way, the data is only
 * retrieved and processed before it is posted.
 */
export const imageSupplier$ = new ReplaySubject<{
  church: string;
  files: File[];
}>(1);

export const showPopup = new Subject<boolean>();
