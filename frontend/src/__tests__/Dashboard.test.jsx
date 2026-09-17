// src/__tests__/Dashboard.test.jsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../routes/Dashboard.jsx';

function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={['/Dashboard']}>
      <Dashboard />
    </MemoryRouter>
  );
}

describe('Dashboard page', () => {
  it('renders page title and top navigation tabs', () => {
    renderWithRouter();

    expect(
      screen.getByRole('heading', { name: /Culture Insights Dashboard/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Dashboard/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Culture Analysis/i })
    ).toBeInTheDocument();
  });

  it('shows the company logo images on the left column', () => {
    renderWithRouter();

    expect(screen.getByAltText(/RIO icon/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Rio Tinto/i)).toBeInTheDocument();
  });

  it('renders the main post feed area and initial placeholder text', async () => {
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText(/No results\./i)).toBeInTheDocument();
    });
  });

  it('renders bottom statistics section with chart titles', async () => {
    renderWithRouter();

    await waitFor(() => {
      expect(
        screen.getByText(/Sentiment Analysis Statistics/i)
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText(/Cultural Dimensions/i)
    ).toBeInTheDocument();

    expect(
      screen.getAllByText(/Statistics/i).length
    ).toBeGreaterThanOrEqual(1);
  });
});
