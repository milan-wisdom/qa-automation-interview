# UI Automation Interview

This project is a UI-only application built with Next.js, designed for automation testing exercises.

## Features

- Form with various input types (text, email, datepicker).
- Dynamic fields for additional emails.
- Conditional rendering of elements (e.g., comments section).
- Basic validation and asynchronous username validation.
- Responsive layout.

### Prerequisites

- Node.js installed

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd ui-automation-interview
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000.

### Automation Testing Instructions

Write automation tests to:
• Fill out the form fields and submit the form.
• Validate error messages for incorrect inputs.
• Handle dynamic form field interactions.
• Verify the form reset functionality.
• Test the visibility of conditionally rendered fields.
• Simulate asynchronous validation for the username field.
• Recommended tools: Cypress, Playwright, or Selenium.
