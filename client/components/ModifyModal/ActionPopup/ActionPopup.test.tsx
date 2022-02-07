import { render } from '@testing-library/react';
import ActionPopup from './ActionPopup';

afterEach(() => {
  jest.useRealTimers();
});

test('button is displayed when visible is set to true', () => {
  const { container } = render(<ActionPopup visible={true} />);

  /**
   * The animation library requires that the **AnimatePresence component** wraps the actual
   * **popup** element in order for enter and exit transitions to be executed on mount and unmount.
   * Thus **popup** is the first child of the rendered component
   */
  const popup = container.children[0];
  expect(popup).toBeInTheDocument();
});

test('button is not displayed when visible is set to false', () => {
  const { container } = render(<ActionPopup visible={false} />);
  const popup = container.children[0];
  expect(popup).toBeUndefined();
});
