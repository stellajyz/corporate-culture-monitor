# Backend Testing Documentation

This document describes the **testing strategy, structure, coverage**, and **compliance with project guidelines** for the *Corporate Culture Monitor* backend.  
All backend tests run with **pytest** and are automatically executed in **GitHub Actions** through `.github/workflows/backend-tests.yml`.

---

## Table of Contents
- [1. Test Structure](#1-test-structure)
- [2. What We Test](#2-what-we-test)
  - [2.1 Unit Tests](#21-unit-tests)
  - [2.2 Integration Tests](#22-integration-tests)
- [3. Mocking Strategy](#3-mocking-strategy)
- [4. Alignment With Project Testing Guidelines](#4-alignment-with-project-testing-guidelines)
- [5. How to Run Tests](#5-how-to-run-tests)
- [6. Limitations & Future Work](#6-limitations--future-work)

---

## 1. Test Structure

```

backend/
├── tests/
│ ├── test_imports.py # Module import sanity checks
│ ├── test_data_process.py # Data cleaning, validation, schema tests
│ ├── test_sentiment_dbcheck.py # Evidence-level sentiment re-check
│ ├── test_mapping_sub2dim.py # Subtheme → dimension mapping logic
│ ├── test_subtheme_classify_cluster.py # Clustering & representative selection
│ ├── test_subthe_dimen_sr.py # Subtheme & dimension JSON summary runner
│ ├── test_overall_sr.py # Overall summary generation
│ ├── test_suggestions.py # Improvement suggestion generation
│ ├── test_pipeline_structure.py # High-level pipeline smoke tests
│ └── test_train_cr_encoder.py # CE training setup, config validation

```


The backend test suite covers the *entire NLP pipeline*, from raw data → processed CSV → sentiment re-check → mapping → clustering → insights generation.

---

## 2. What We Test

### 2.1 Unit Tests

Unit tests validate core logic, edge cases, and input validation.

### `test_data_process.py`
- Validates:
  - CSV schema & normalization  
  - Missing columns  
  - Type conversions  
  - Handling empty/invalid rows  
- Sad cases:
  - Corrupted data  
  - Unexpected types  

---

### `test_sentiment_dbcheck.py`
- Tests evidence-level sentiment re-check logic:
  - VADER / RoBERTa / DistilBERT majority vote  
  - Confidence calculation  
- Sad cases:
  - Model disagreement  
  - Malformed model output  

---

### `test_mapping_sub2dim.py`
- Tests:
  - BGE/SimCSE similarity normalization  
  - CE reranker scoring  
  - Dimension multi-match  
- Embedding outputs are mocked.

---

### `test_train_cr_encoder.py`
- Tests:
  - `gold.csv` schema validation  
  - Multi-label parsing  
  - Dataset creation for CE  
  - Random splits reproducibility  
- HF model loading is mocked.

---

## 2.2 Integration Tests

Integration tests test multi-stage pipeline behaviour.

---

### `test_subthe_dimen_sr.py`
- Runs subtheme/dimension summary script  
- LLM output mocked to deterministic JSON  
- Checks file creation & JSON schema

---

### `test_overall_sr.py`
- Executes the entire overall summary generator  
- Checks:
  - Global statistics aggregation  
  - Metadata injection  
  - JSON output format  

---

### `test_subtheme_classify_cluster.py`
- Validates:
  - KMeans clustering per dimension  
  - ≤10 representatives rule  
  - Representative + member consistency  
  - No subtheme dropped  

---

### `test_suggestions.py`
- Tests:
  - Suggestion generation per dimension  
  - Short-term / long-term / risks fields  
- LLM mocked for reproducibility

---

### `test_pipeline_structure.py`
- Smoke test verifying:
  - Script existence  
  - Key entrypoints importable  
  - Pipeline modules intact  

---

### `test_imports.py`
Basic module import and environment health checks.

---

## 3. Mocking Strategy

> *“You cannot trust external dependencies; mock both happy and sad cases.”*

We mock:

- **DeepSeek / Gemini LLM outputs**  
- **HuggingFace embeddings + predictions**  
- **File-system calls** (use temp dirs)  
- **Randomness** (fixed seeds)  

This ensures tests are fast, stable, and deterministic in CI.

---

## 4. Alignment With Project Testing Guidelines

| Guideline | Our Coverage |
|----------|--------------|
| Unit tests | All major modules tested |
| Integration tests | Summary, mapping, clustering |
| Edge cases | Included in all major tests |
| Mocking external libs | LLM, HF models, IO |
| Data validation | test_data_process, test_train_cr_encoder |
| Business logic | mapping, clustering, confidence rules |
| Error handling | malformed inputs, missing fields |
| Race conditions | N/A (batch-only pipeline) |
| If automated tests impossible | N/A (all automated) |

The backend fully satisfies project expectations.

---

## 5. How to Run Tests

```bash
cd backend

# Run all tests
pytest

# Verbose mode
pytest -vv

# Run a specific test file
pytest tests/test_data_process.py

```

## 6. Limitations & Future Work

Heavy LLM/HF model calls are mocked for speed.

No full E2E tests on real LLM API (too costly).

No race-condition tests (pipeline is purely offline batch).

Could add coverage report via pytest-cov.