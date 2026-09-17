// src/__tests__/PostFeed.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../components/PostFeedList.jsx', () => {
  return {
    __esModule: true,
    default: ({ onOpenPost }) => (
      <div data-testid="post-feed-list">
        <button onClick={() => onOpenPost('post-123')}>
          Open Post 123
        </button>
        <button onClick={() => onOpenPost(null)}>
          Open Invalid Post
        </button>
      </div>
    ),
  };
});

vi.mock('../components/PostFeedDetail.jsx', () => {
  return {
    __esModule: true,
    default: ({ postKey, onBack }) => (
      <div data-testid="post-feed-detail">
        <div>Detail for {postKey}</div>
        <button onClick={onBack}>Back</button>
      </div>
    ),
  };
});

import PostFeed from '../components/PostFeed.jsx';

const getFlipContainer = (container) => {
  const section = container.querySelector('section');
  if (!section) return null;
  return section.querySelector('div');
};

describe('PostFeed', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders list view by default and no detail', () => {
    const { container } = render(
      <PostFeed
        year={2024}
        month={null}
        filterFlipKey={0}
        sentiment={null}
        subtheme=""
        dimension=""
      />
    );

    expect(screen.getByTestId('post-feed-list')).toBeInTheDocument();
    expect(
      screen.queryByTestId('post-feed-detail')
    ).not.toBeInTheDocument();

    const flip = getFlipContainer(container);
    expect(flip).not.toBeNull();
    expect(flip.style.transform).toBe('');
  });

  it('flips and shows detail when a post is opened (happy case)', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <PostFeed
        year={2024}
        month={null}
        filterFlipKey={0}
        sentiment={null}
        subtheme=""
        dimension=""
      />
    );

    const flip = getFlipContainer(container);
    expect(flip).not.toBeNull();

    await user.click(screen.getByText('Open Post 123'));

    expect(screen.getByTestId('post-feed-detail')).toBeInTheDocument();
    expect(screen.getByText(/Detail for post-123/i)).toBeInTheDocument();

    expect(flip.style.transform).toBe('rotateY(180deg)');
  });

  it('goes back to list and resets transform when back is clicked', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <PostFeed
        year={2024}
        month={null}
        filterFlipKey={0}
        sentiment={null}
        subtheme=""
        dimension=""
      />
    );

    const flip = getFlipContainer(container);
    expect(flip).not.toBeNull();

    await user.click(screen.getByText('Open Post 123'));
    expect(screen.getByTestId('post-feed-detail')).toBeInTheDocument();
    expect(flip.style.transform).toBe('rotateY(180deg)');

    await user.click(screen.getByText('Back'));

    expect(
      screen.queryByTestId('post-feed-detail')
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('post-feed-list')).toBeInTheDocument();

    expect(flip.style.transform).toBe('rotateY(0deg)');
  });

  it('does not flip or show detail when openDetail is called with invalid key (sad case)', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <PostFeed
        year={2024}
        month={null}
        filterFlipKey={0}
        sentiment={null}
        subtheme=""
        dimension=""
      />
    );

    const flip = getFlipContainer(container);
    expect(flip).not.toBeNull();

    await user.click(screen.getByText('Open Invalid Post'));

    expect(
      screen.queryByTestId('post-feed-detail')
    ).not.toBeInTheDocument();
    expect(flip.style.transform).toBe('');
  });
});
