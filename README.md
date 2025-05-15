# Women Empowerment Platform

A modern web platform designed to empower women through entrepreneurship, mentorship, and networking opportunities.

## Features

- **User Authentication**
  - Email/Password login
  - Phone OTP verification
  - Social login (Google/Facebook)

- **Multi-Role System**
  - Entrepreneur
  - Supplier
  - Mentor
  - Funder

- **AI Assistant**
  - 24/7 chat support
  - Registration guidance
  - Role selection help
  - Quick responses

## Project Structure

```
women-empowerment/
├── index.html          # Main landing page
├── register.html       # User registration page
├── styles/
│   ├── styles.css     # Global styles
│   ├── register.css   # Registration page styles
│   └── chatbot.css    # Chatbot styles
├── scripts/
│   ├── script.js      # Main JavaScript
│   ├── register.js    # Registration logic
│   └── chatbot.js     # AI chatbot functionality
└── README.md
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Python 3.x (for running the local server)

### Running the Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd women-empowerment
   ```

2. Start the local server:
   ```bash
   python -m http.server 8000
   ```

3. Open your browser and visit:
   ```
   http://localhost:8000
   ```

## Usage Guide

1. **Navigation**
   - Click "Sign In" to access the login modal
   - Click "Register" to create a new account

2. **Registration Process**
   - Fill in basic information
   - Choose your role (Entrepreneur, Supplier, Mentor, or Funder)
   - Complete role-specific details

3. **AI Assistant**
   - Click the chat icon (💬) in the bottom-right corner
   - Ask questions about registration, roles, or general help
   - Use quick reply buttons for common queries

## Development

To modify the project:

1. **Styling**
   - Global styles are in `styles.css`
   - Registration styles in `register.css`
   - Chatbot styles in `chatbot.css`

2. **JavaScript**
   - Main interactions in `script.js`
   - Registration logic in `register.js`
   - Chatbot functionality in `chatbot.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
