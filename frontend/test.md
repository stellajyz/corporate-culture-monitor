# Frontend Testing (Vitest + React Testing Library)

## 1. Overview

Our frontend uses **Vitest + React Testing Library** for unit and integration
tests. The goal is to verify that key pages and components:

- render correctly under different props and route paths  
- respond properly to **user interactions** (clicks, navigation, filters)  
- pass the right props to child components and react to callbacks  

Because the dashboard heavily relies on charts and backend APIs, we use
**mocking** for external dependencies so that tests are stable and deterministic.

---

## 2. Testing Directory Structure 
```
frontend/
└── src/
    ├── __tests__/
    │   ├── App.test.jsx           # Routing integration tests
    │   ├── Dashboard.test.jsx     # Dashboard behaviour + filters
    │   ├── CultureAnalysis.test.jsx # CultureAnalysis behaviour
    │   └── PostFeed.test.jsx      # PostFeed flip-card logic
    └── setupTests.js          # JSDOM + global mocks (fetch, IntersectionObserver)
```

Run all frontend tests:
cd frontend
npx vitest --run

## 3. Test Files and Coverage 

#### 3.1 App.test.jsx – Routing Integration Tests

Focus: overall routing behaviour with React Router.

Wraps <App /> inside MemoryRouter and asserts that:

Visiting / renders the Dashboard page by default.

Visiting /Dashboard shows the Dashboard content.

Visiting /Culture-Analysis shows the Culture Analysis page.

Unknown paths (e.g. /unknown) redirect back to /Dashboard.

Mocks network calls and heavy child behaviour where necessary so that tests
only focus on routing and top-level rendering.

Covers:

SPA routing config

Navigation tabs interaction (via <TopRouteTabs /> links)

Basic page headings and layout rendering

#### 3.2 PostFeed.test.jsx – Post Feed Flip Behaviour

Focus: component behaviour and user interaction of the flip card.

In these tests we mock PostFeedList and PostFeedDetail to control
callbacks without relying on real data loading.

Main scenarios:

Default state (happy case)

Renders the list view by default.

Detail view is hidden and the flip container has no rotation
(transform is empty).

Open a post (happy case)

Clicking the mocked "Open Post" button triggers onOpenPost("post-123").

PostFeed sets activeKey, renders <PostFeedDetail />, and applies
transform: rotateY(180deg) via flipRef.

Back to list (happy case)

Clicking the mocked "Back" button in PostFeedDetail calls onBack().

PostFeed clears activeKey and resets transform to rotateY(0deg), so
the list is visible again.

Invalid key (sad case)

When onOpenPost(null) is triggered, PostFeed ignores the call, does not
flip and does not render detail.

Verifies robust handling of bad input from child components.

These tests ensure the flip animation and view-switching logic are correct,
without depending on real data or scroll behaviour.

#### 3.3 CultureAnalysis.test.jsx – Culture Analysis Page

Focus: interactions between TopRouteTabs, DimensionFilterPanel,
and SuggestionSummary.

We mock the right-hand filter panel and suggestion component, and only
assert the behaviour of the page-level state.

Key cases:

Initial render

Page title “Culture Analysis” is visible.

<TopRouteTabs /> is rendered.

<SuggestionSummary /> is called with dimension="" and
subthemeFile="" (overall summary mode).

Selecting a dimension + subtheme (happy case)

Simulate onSelect("Performance", "Onboarding Process", "performance_onboarding.json")
from DimensionFilterPanel.

Assert that SuggestionSummary receives updated props:
dimension="Performance", subthemeFile="performance_onboarding.json".

Back from subtheme to dimension (happy case)

Trigger onBack("dimension") from SuggestionSummary.

subtheme and subthemeFile are cleared, dimension is preserved, so
the page goes back to dimension-level view.

Back to overall (happy case / reset)

Trigger onBack("overall").

All state values are cleared and overall summary is rendered again.

These cover the state machine of the Culture Analysis page and how it
coordinates two child components.

#### 3.4 Dashboard.test.jsx – Dashboard Behaviour & Filters

Focus: integration behaviour of Dashboard page, filters and child props.

In this file we mock:

PostFeed (capture year, month, dimension, subtheme, filterFlipKey)

CalendarPanel (expose onYearChange, onMonthSelect)

DimensionRadar (expose onFilterChange)

SentimentVenn and Statistics (render simple placeholders)

getSBI from api.js (returns fake months_with_data, sbi, delta)

Scenarios:

Basic layout / initial props

Asserts that the title “Culture Insights Dashboard” is rendered.

TopRouteTabs, PostFeed, CalendarPanel, SentimentVenn,
DimensionRadar, and Statistics are all present.

Confirms initial props passed to PostFeed:
year="all", month=null, empty dimension/subtheme.

Change year via CalendarPanel (happy case)

Call the mocked onYearChange("2024").

Wait for getSBI({ year: "2024" }) to be called.

Assert that PostFeed received year="2024" and month=null,
and filterFlipKey has changed (indicating a refresh).

Select month (happy case)

Mock backend to return months_with_data: ["03"].

Trigger onMonthSelect("03", "2024").

Assert that PostFeed now gets year="2024", month="03" and that
charts (SentimentVenn, DimensionRadar, Statistics) receive the
same filters.

Apply DimensionRadar filter (happy + sad)

Trigger onFilterChange({ dimension: "Integrity", subtheme: "Whistleblowing" }).

Verify PostFeed receives matching dimension and subtheme, and
filterFlipKey increments.

Optionally trigger a “sad case” with empty filter
{ dimension: "", subtheme: "" } and assert that filters reset correctly.

These tests verify that Dashboard’s business logic is correct: it works as
a coordinator for time filters and dimension filters, and propagates them to
children consistently.

## 4. Mocking Strategy 

API calls (api.js)

getSBI, getDimensionCounts, getCAIndex, etc. are mocked in tests.

We simulate both successful responses and failure/no-data cases.

This ensures frontend logic is tested independently of backend availability.

Router-related hooks

Components like TopRouteTabs use useLocation / useNavigate.

In tests, components are rendered inside MemoryRouter, and explicit
initialEntries are passed to control the current route.

Heavy visual components / charts

Recharts-based charts are wrapped in simple mock components in some tests
because we trust the chart library itself.

Tests focus on logic (prop values, conditional rendering) rather than
pixel-perfect chart output.

Browser APIs

IntersectionObserver and fetch are defined in setupTests.js so that
components depending on them do not crash in the JSDOM environment.

This follows the guideline “do not trust external dependencies, mock their
happy and sad cases to test our own code”.
