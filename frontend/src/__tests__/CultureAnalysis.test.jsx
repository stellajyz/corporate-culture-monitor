// src/__tests__/CultureAnalysis.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../components/TopRouteTabs', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="top-tabs">Mock TopRouteTabs</div>,
  };
});

vi.mock('../components/DimensionFilterPanel', () => {
  return {
    __esModule: true,
    default: ({ onSelect }) => (
      <div data-testid="dimension-filter">
        <button onClick={() => onSelect('Agility', '', '')}>
          Select Agility (dimension only)
        </button>
        <button onClick={() => onSelect('Agility', 'Fast releases', 'agility_fast.json')}>
          Select Agility / Fast releases
        </button>
      </div>
    ),
  };
});

vi.mock('../components/SuggestionSummary', () => {
  return {
    __esModule: true,
    default: ({ dimension, subthemeFile, onBack }) => (
      <div data-testid="suggestion-summary">
        <div>dim: {dimension || 'ALL'}</div>
        <div>file: {subthemeFile || 'NONE'}</div>
        <button onClick={() => onBack('dimension')}>Back to Dimension</button>
        <button onClick={() => onBack('overall')}>Back to Overall</button>
      </div>
    ),
  };
});

import CultureAnalysis from '../../routes/CultureAnalysis.jsx';

describe('CultureAnalysis page', () => {
  beforeEach(() => vi.clearAllMocks());

  it('renders title, top tabs and overall summary by default', () => {
    render(<CultureAnalysis />);

    expect(screen.getByRole('heading', { name: /Culture Analysis/i })).toBeInTheDocument();
    expect(screen.getByTestId('top-tabs')).toBeInTheDocument();

    const summary = screen.getByTestId('suggestion-summary');
    expect(summary).toHaveTextContent('dim: ALL');
    expect(summary).toHaveTextContent('file: NONE');
  });

  it('updates dimension when selecting dimension only', async () => {
    const user = userEvent.setup();
    render(<CultureAnalysis />);

    await user.click(screen.getByText(/Select Agility \(dimension only\)/i));

    const summary = screen.getByTestId('suggestion-summary');
    expect(summary).toHaveTextContent('dim: Agility');
    expect(summary).toHaveTextContent('file: NONE');
  });

  it('updates dimension + subtheme when selecting subtheme', async () => {
    const user = userEvent.setup();
    render(<CultureAnalysis />);

    await user.click(screen.getByText(/Select Agility \/ Fast releases/i));

    const summary = screen.getByTestId('suggestion-summary');
    expect(summary).toHaveTextContent('dim: Agility');
    expect(summary).toHaveTextContent('file: agility_fast.json');
  });

  it('handles back logic correctly', async () => {
    const user = userEvent.setup();
    render(<CultureAnalysis />);

    await user.click(screen.getByText(/Select Agility \/ Fast releases/i));
    let summary = screen.getByTestId('suggestion-summary');
    expect(summary).toHaveTextContent('dim: Agility');
    expect(summary).toHaveTextContent('file: agility_fast.json');

    // back to dimension
    await user.click(screen.getByText(/Back to Dimension/i));
    summary = screen.getByTestId('suggestion-summary');
    expect(summary).toHaveTextContent('dim: Agility');
    expect(summary).toHaveTextContent('file: NONE');

    // back to overall
    await user.click(screen.getByText(/Back to Overall/i));
    summary = screen.getByTestId('suggestion-summary');
    expect(summary).toHaveTextContent('dim: ALL');
    expect(summary).toHaveTextContent('file: NONE');
  });
});
