# Corporate Culture Monitor

A full-stack analytics platform for collecting, processing, analysing, and visualising external corporate culture signals using Python, NLP, REST APIs, and React.

This project was originally developed as part of the UNSW COMP9900 capstone project in a student team for an industry client. This repository is a cleaned public portfolio version intended to demonstrate the software engineering, data processing, testing, and system integration work involved in the project.

## Tech Stack

### Backend and Data
- Python
- Flask
- REST APIs
- SQLite
- NLP and machine learning
- Data processing pipelines

### Frontend
- React
- Vite
- Tailwind CSS
- JavaScript

### Engineering and DevOps
- Git and GitHub
- Docker
- Docker Compose
- GitHub Actions
- Pytest
- Vitest
- React Testing Library

## Project Overview

The platform processes publicly available text from news and social media sources and transforms it into structured corporate culture insights.

The processing workflow includes:

1. Collecting text data through APIs and data collection scripts.
2. Cleaning and standardising raw text and metadata.
3. Applying sentiment analysis and NLP models.
4. Mapping content to corporate culture dimensions and subthemes.
5. Calculating analytical metrics and structured summaries.
6. Exposing processed results through Flask REST APIs.
7. Displaying results through an interactive React dashboard.

The NLP pipeline includes sentiment classification, culture-dimension mapping, subtheme analysis, and structured AI-assisted reporting.

## Key Features
- Automated collection and preprocessing of public text data
- Sentiment analysis and culture-dimension classification
- Subtheme extraction and mapping
- REST API access to processed analytical results
- Interactive React analytics dashboard
- AI-assisted structured summaries and recommendations
- Backend unit and integration testing
- Frontend component and interaction testing
- Automated testing through GitHub Actions
- Docker-based local deployment

## My Contributions

My contributions to the team project included:

- Developing and integrating Python-based data processing workflows.
- Supporting NLP and sentiment-analysis pipelines.
- Working with REST APIs and backend data flows.
- Integrating frontend components with backend API endpoints.
- Testing system outputs and investigating inconsistent pipeline results.
- Contributing to debugging, data transformation, and system integration.
- Working collaboratively through Git branches, pull requests, and code review.

## System Architecture

External Data Sources
        |
        v
Data Collection
        |
        v
Cleaning and Transformation
        |
        v
NLP / Sentiment / Classification
        |
        v
Processed Data / SQLite
        |
        v
Flask REST API
        |
        v
React Dashboard

## Repository Structure

corporate-culture-monitor/
|
├── .github/
│   └── workflows/              # CI and automated tests
│
├── backend/
│   ├── server/                 # Backend service modules
│   ├── tests/                  # Backend unit and integration tests
│   ├── app.py                  # Flask application entry point
│   ├── config.py               # Backend configuration
│   ├── routes.py               # REST API routes
│   ├── models.py               # Backend data models
│   ├── pipeline.py             # Main data/NLP pipeline
│   ├── data_process.py         # Core data processing workflow
│   ├── data_process_llm.py     # LLM-assisted processing logic
│   ├── suggestions.py          # Structured recommendation generation
│   ├── utils.py                # Shared utilities
│   └── requirements.txt        # Python dependencies
│
├── crawler/
│   ├── aggregator.py           # Aggregates collected data
│   ├── dataclean.py            # Data cleaning utilities
│   ├── news_crawler.py         # News data collection
│   └── reddit_data_process.py  # Reddit data preprocessing
│
├── data/
│   └── processed/
│       ├── build_news_db.py    # Build processed news database
│       └── build_reddit_db.py  # Build processed Reddit database
│
├── frontend/
│   ├── assets/                 # Static assets
│   ├── public/                 # Public frontend files
│   ├── routes/                 # Page-level route components
│   ├── src/
│   │   ├── __tests__/          # Frontend tests
│   │   ├── components/         # Reusable UI components
│   │   ├── api.js              # Backend API wrapper
│   │   ├── App.jsx             # Main React application
│   │   └── main.jsx            # Frontend entry point
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── Dockerfile                  # Backend container configuration
├── docker-compose.yml          # Backend and frontend orchestration
├── package.json
└── README.md

## Data Availability

The original datasets, local databases, generated reports, and model outputs are not included in this public repository.

Raw news and social media datasets have been excluded from version control to keep the repository lightweight and avoid publishing unnecessary third-party data.

The repository currently focuses on source code, data-processing logic, testing, software architecture, and deployment configuration.

## Environment Variables

Some optional functionality requires external API credentials.

The application expects credentials to be provided through environment variables rather than hard-coded in source files.

Supported variables include:

```text
NEWS_API_KEY
GOOGLE_API_KEY
OPENROUTER_API_KEY
```

Example PowerShell configuration:

```powershell
$env:NEWS_API_KEY="your-api-key"
$env:GOOGLE_API_KEY="your-api-key"
$env:OPENROUTER_API_KEY="your-api-key"
```

API credentials are intentionally excluded from this repository.

## Setup and Run

### Backend

Create a Python virtual environment:

```bash
cd backend
python -m venv .venv
```

Activate the environment on Windows:

```powershell
.venv\Scripts\activate
```

Activate the environment on macOS or Linux:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the backend:

```bash
python app.py
```

The backend runs locally at:

```text
http://localhost:5000
```

### Frontend

Install frontend dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs locally at:

```text
http://localhost:5173
```

## Docker

The application can also be started with Docker Compose from the project root:

```bash
docker-compose up --build
```

This builds and starts the backend and frontend services using the project Docker configuration.

## Testing

### Backend

Backend tests use Pytest.

The test suite covers areas including:

- Data cleaning
- Sentiment-processing logic
- Subtheme-to-dimension mapping
- Pipeline structure
- Model-related processing
- Structured report generation
- Import and dependency validation

External LLM calls are mocked where appropriate to keep tests deterministic.

Run the backend tests with:

```bash
cd backend
pytest
```

Additional backend testing documentation is available in:

```text
backend/tests/TESTING.md
```

Backend tests are also integrated into the GitHub Actions workflow.

### Frontend

Frontend tests use Vitest and React Testing Library.

Tests cover:

- Application routing
- Component rendering
- User interaction
- Dashboard filters
- Page state management
- API-dependent behaviour using mocks

Run frontend tests with:

```bash
cd frontend
npm test
```

Additional frontend testing documentation is available in:

```text
frontend/test.md
```

## Development Practices

The project uses:

- Git-based version control
- Pull-request-based collaboration
- Automated testing
- API-based frontend/backend integration
- Containerised local deployment
- Environment variables for external API credentials
- Modular Python and React code organisation

## Project Context

This repository is a public portfolio version of a university capstone team project.

Large datasets, local databases, generated reports, model weights, temporary files, and API credentials are intentionally excluded.

The public repository focuses on source code, software architecture, data-processing workflows, testing, integration, and deployment configuration.