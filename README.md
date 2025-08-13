# AI Screening Agent

> This project is a web application that allows users to screen candidates for job openings using AI. Users can input job descriptions and resumes, and the AI will provide a screening analysis.

## Features

*   **AI-Powered Screening:** Leverages AI to analyze job descriptions and resumes, providing insights into candidate suitability.
*   **Job Input Form:** A user-friendly form to submit job details and upload resumes.
*   **Results Display:** Clear and concise presentation of the AI's screening results.
*   **User Authentication:** Secure user login and registration.
*   **Responsive Design:** The application is designed to work on various screen sizes.

## Tech Stack

*   **Frontend:** React, TypeScript, Vite
*   **Styling:** Tailwind CSS, Radix UI
*   **State Management:** Zustand
*   **Form Handling:** React Hook Form
*   **Routing:** React Router
*   **Linting:** ESLint

## Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/ai-screening-agent.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd ai-screening-agent-client
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

To run the application in development mode, use the following command:

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`.

### Building the Application

To build the application for production, use the following command:

```bash
npm run build
```

This will create a `dist` folder with the production-ready files.

## Folder Structure

```
.
├── public/
│   └── logo.png
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── store/
│   ├── types.ts
│   └── main.tsx
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.ts
```

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.