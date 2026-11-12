import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserNavigation } from '../app/navigation';
import { NavigationProvider } from '../app/NavigationProvider';
import { DemoProvider } from '../state/DemoProvider';
import { AppShell } from '../app/AppShell';
describe('overlay lifecycle', () => {
  it('traps focus, closes with Escape after the exit motion, and releases inert state', async () => {
    history.replaceState(null, '', '/home/treinos'); const navigation = new BrowserNavigation(window);
    const view = render(<DemoProvider><NavigationProvider navigation={navigation}><AppShell/></NavigationProvider></DemoProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Atividade' }));
    const dialog = screen.getByRole('dialog'); expect(dialog).toHaveFocus();
    expect(screen.getByTestId('app-shell')).toHaveAttribute('inert');
    fireEvent.keyDown(document, { key: 'Tab' }); expect(screen.getByRole('button', { name: 'Fechar' })).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(screen.getByTestId('app-shell')).not.toHaveAttribute('inert');
    view.unmount(); navigation.dispose();
  });
});
