import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Button from './Button';
import { enableFetchMocks } from 'jest-fetch-mock';
import fetchMock from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';

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
  fetchMock.mockResponse(async () =>
    new Promise((resolve) => resolve(true)).then(() => ({ body: 'ok' }))
  );
  const { container } = render(<Button />);
  const button = container.children[0] as HTMLButtonElement;
  act(() => {
    fireEvent.click(button);
  });

  await waitFor(() => {
    expect(
      screen.getByText('Schimbarile au fost salvate cu success')
    ).toBeInTheDocument();
  });

  await act(async () => {
    jest.runOnlyPendingTimers();
    return new Promise((resolve) => resolve());
  });

  await waitFor(() => {
    expect(Number(screen.getByRole('tooltip').children[0].style.opacity)).toBe(
      1
    );
    expect(screen.getByRole('tooltip').children[0].style.transform).toBe(
      'none'
    );
  });

  await act(async () => {
    jest.runAllTimers();
  });

  expect(screen.getByRole('tooltip').children[0].style.opacity).toBe('0');
  expect(screen.getByRole('tooltip').children[0].style.transform).toMatch(
    /translateX\(([0-9]|[1-9][0-9]|[1-9][0-9][0-9])px\)/g
  );
  screen.debug(container);
});
