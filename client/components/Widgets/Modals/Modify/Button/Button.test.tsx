import Button from './Button';

import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

// as the specs suggest we have to enable fetch mocking
enableFetchMocks();

beforeEach(() => {
  /**
   * to prevent fetch from keeping a specific test's functionality
   * we reset the mock
   */
  fetchMock.resetMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

test('open popup on submit and close it after sometime', async () => {
  jest.useFakeTimers();
  fetchMock.mockResponse(() => Promise.resolve({ body: 'ok' }));

  const { container } = render(<Button />);
  const button = container.children[0] as HTMLButtonElement;

  fireEvent.click(button);

  await waitFor(() => {
    expect(
      screen.getByText('Schimbarile au fost salvate cu success')
    ).toBeInTheDocument();
  });

  act(() => {
    jest.runOnlyPendingTimers();
  });

  const tooltipElement = screen.getByRole('tooltip').children[0] as HTMLElement;

  await waitFor(() => {
    expect(tooltipElement.style.opacity).toBe('1');
    expect(tooltipElement.style.transform).toBe('none');
  });

  act(() => {
    jest.runAllTimers();
  });

  expect(tooltipElement.style.opacity).toBe('0');
  expect(tooltipElement.style.transform).toMatch(/translateX\(\d{1,3}px\)/g);
  screen.debug(container);
});
