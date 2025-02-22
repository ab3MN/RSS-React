import { render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from './ThemeProvider';

import { ThemeContext } from '@/context/ThemeContext';
import { Theme } from '@/constants';
import useLocaLStorage from '@/hooks/useLocaLStorage';

vi.mock('@/hooks/useLocaLStorage', () => ({
  default: vi.fn(() => ({
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  })),
}));

describe('ThemeProvider', () => {
  test('should provide default light theme', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>{({ theme }) => <span data-testid="theme">{theme}</span>}</ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent(Theme.LIGHT);
  });

  test('should switch theme on handleSwitchTheme call', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, handleSwitchTheme }) => (
            <>
              <span data-testid="theme">{theme}</span>
              <button onClick={handleSwitchTheme}>Switch</button>
            </>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId('theme');
    const button = screen.getByText('Switch');

    expect(themeElement).toHaveTextContent(Theme.LIGHT);
    await user.click(button);
    expect(themeElement).toHaveTextContent(Theme.DARK);
    await user.click(button);
    expect(themeElement).toHaveTextContent(Theme.LIGHT);
  });

  test('should load theme from localStorage', () => {
    (useLocaLStorage as Mock).mockReturnValue({
      getItem: vi.fn(() => Theme.DARK),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });

    render(
      <ThemeProvider>
        <ThemeContext.Consumer>{({ theme }) => <span data-testid="theme">{theme}</span>}</ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent(Theme.DARK);
  });
});
