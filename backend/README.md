# Backend README

This backend provides the full NLP processing pipeline and reporting logic for the Corporate Culture Monitor system. It includes data processing, sentiment verification, subtheme–dimension mapping, clustering, and summary JSON generation. The backend is implemented in Python and structured for clarity, modularity, and testability.

---

## Project Structure

```
backend/
├─ app.py # Main entry point of the backend, initializing the Flask app and loading all routes.
├─ config.py # Configuration file defining paths, constants, and model locations.
├─ models.py # Data models and structures used across the backend.
├─ routes.py # Defines all API endpoints, handling frontend requests and returning JSON responses.
├─ utils.py  # Utility functions used across the backend for data loading, formatting, and helper tasks.
├─ requirements.txt # Python dependencies for backend 
│
├─ addmapping.py # Add or update mapping rules between subthemes and dimensions
├─ compare.py # Compare outputs or data across different versions or runs
│
├─ data_process.py # Core data cleaning and preprocessing workflow
├─ data_process_llm.py # LLM-based data processing and text generation logic
├─ download_models.py # Download and initialize required NLP/ML models
├─ train_cr_encoder.py # Train the cultural-related text encoder model   
├─ sentiment_dbcheck.py # Validate sentiment database consistency and integrity
├─ mapping_sub2dim.py  # Map subthemes → representatives → cultural dimensions
├─ subtheme_classify_cluster.py # Classify and cluster subthemes into meaningful groups
├─ pipeline.py # Main entry point for running the full NLP pipeline
│
├─ subthe_dimen_core.py # Core logic for loading, aggregating, and structuring subtheme/dimension data
├─ subthe_dimen_llm.py # LLM-powered expansion and reasoning for subthemes/dimensions
├─ subthe_dimen_sr.py # Generate structured reports for dimensions and subthemes
├─ overall_sr.py # Generate the overall cultural summary report
├─ suggestions.py # Main entry point for executing the full summarisation-and-recommendation generation pipeline
│
├─ update_dimensions.py # Automatically update cultural dimension definitions and metadata
│
└── tests/ # Backend unit & integration tests

```

---

## Installation

```bash
cd backend
pip install -r requirements.txt
python download_models.py
```

---

## Running the Backend

```bash
python app.py
```

---

## Testing

For full backend testing strategy, please refer to  
[tests/TESTING.md](tests/TESTING.md)

```bash
pytest -q
```

---

## Test Coverage Summary

Our backend tests follow the project's testing guidelines:

Unit tests verify:

- Data cleaning correctness

- Sentiment re-check logic (happy & sad cases)

- Subtheme→dimension mapping (mocked model behaviours)

- Clustering stability

- JSON report formatting and required fields


Integration tests validate:

- Pipeline structure remains consistent

- Models load correctly

- Full LLM-based report generation (mocked for determinism)


External LLM calls are mocked to ensure deterministic test results.

---