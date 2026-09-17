import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App.jsx';


describe('App routing behaviour', () => {

  test('renders Dashboard by default when visiting "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Culture Insights Dashboard/i)).toBeInTheDocument();
  });

  test('renders Dashboard on "/Dashboard"', () => {
    render(
      <MemoryRouter initialEntries={['/Dashboard']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Culture Insights Dashboard/i)).toBeInTheDocument();
  });

  test('renders CultureAnalysis on "/Culture-Analysis"', () => {
    render(
      <MemoryRouter initialEntries={['/Culture-Analysis']}>
        <App />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', {
      name: /Culture Analysis/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('unknown routes redirect to "/Dashboard"', () => {
    render(
      <MemoryRouter initialEntries={['/not-exist']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Culture Insights Dashboard/i)).toBeInTheDocument();
  });
});
