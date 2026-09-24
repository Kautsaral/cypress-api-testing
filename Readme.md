# Cypress API Automation Testing

API test automation project built using Cypress for testing the Restful Booker API.

This project demonstrates API automation testing practices including positive and negative testing, reusable API functions, data-driven testing, test reporting, and CI/CD integration using GitHub Actions.

## Tech Stack

- Cypress
- JavaScript
- Node.js
- Mochawesome
- GitHub Actions
- Prettier
- ESLint

## Test Coverage

The project currently contains 18 automated API test cases covering:

### Authentication

- Successful login
- Invalid username
- Invalid password
- Empty username
- Empty password
- Empty username and password

### Booking

- Create booking
- Get booking by ID
- Update booking
- Delete booking
- Booking not found
- Update booking without authentication
- Delete booking without authentication
- Invalid booking payload scenarios

## Project Structure

```text
cypress/
├── e2e/
│   ├── auth.cy.js
│   └── booking.cy.js
├── fixtures/
│   ├── auth.json
│   └── booking.json
├── support/
│   ├── api/
│   │   ├── auth.api.js
│   │   └── booking.api.js
│   ├── helpers/
│   │   └── auth.helper.js
│   └── e2e.js
└── reports/
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Kautsaral/cypress-api-testing.git
cd cypress-api-testing
```

Install dependencies:

```bash
npm ci
```

## Environment Configuration

The authentication tests require API credentials.

The following Cypress environment variables are used:

```text
CYPRESS_API_USERNAME
CYPRESS_API_PASSWORD
```

For CI/CD, credentials are stored securely using GitHub Actions Secrets and are not committed to the repository.

## Running Tests

Run all Cypress API tests:

```bash
npx cypress run
```

Run tests using Chrome:

```bash
npx cypress run --browser chrome
```

Run only the authentication tests:

```bash
npx cypress run --spec "cypress/e2e/auth.cy.js"
```

Run only the booking tests:

```bash
npx cypress run --spec "cypress/e2e/booking.cy.js"
```

## Code Quality

Check formatting:

```bash
npm run format:check
```

Format the code:

```bash
npm run format
```

Run ESLint:

```bash
npm run lint
```

## Test Reporting

Generate the Mochawesome report:

```bash
npm run test:report
```

The generated HTML report is available at:

```text
cypress/reports/html/index.html
```

GitHub Actions also uploads the Mochawesome report as an artifact. When tests fail, Cypress failure screenshots are uploaded as a separate artifact for debugging.

## Framework Architecture

The project separates test scenarios, API requests, reusable workflows, and test data to keep the automation framework maintainable and reusable.

```text
Test Specs
(auth.cy.js / booking.cy.js)
        │
        ├──── Fixtures
        │     (Test Data)
        │
        ├──── Helpers
        │     (Reusable Workflows)
        │
        ▼
    API Layer
(auth.api.js / booking.api.js)
        │
        ▼
 Restful Booker API
```

### Test Specs

Test specifications contain test scenarios and assertions.

```text
cypress/e2e/
```

### API Layer

API request logic is separated from the test specifications.

```text
cypress/support/api/
```

This allows API functions such as login, create booking, get booking, update booking, and delete booking to be reused across different test scenarios.

### Helpers

Helpers contain reusable workflows that may combine multiple steps.

For example, `getValidAuthToken()` retrieves valid credentials, performs authentication, validates the response, and returns the authentication token.

```text
cypress/support/helpers/
```

### Fixtures

Fixtures contain reusable test data for authentication and booking scenarios.

```text
cypress/fixtures/
```

The project also uses data-driven testing, allowing multiple test scenarios to be generated from fixture data without duplicating test logic.

## CI/CD Pipeline

GitHub Actions automatically runs the automation pipeline on configured pushes and pull requests.

```text
Push / Pull Request
        │
        ▼
Install Dependencies
        │
        ▼
Prettier Check
        │
        ▼
ESLint
        │
        ▼
Credential Check
        │
        ▼
Cypress API Tests
        │
        ▼
Mochawesome Report
        │
        ▼
GitHub Actions Artifacts
```

The CI pipeline performs:

- Dependency installation using `npm ci`
- Code formatting validation using Prettier
- Static code analysis using ESLint
- Secure credential validation using GitHub Actions Secrets
- Cypress API test execution using Chrome
- Mochawesome report generation
- Mochawesome report artifact upload
- Failure screenshot artifact upload when tests fail