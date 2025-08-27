# AI Screening Agent

> This project is a web application that allows users to screen candidates for job openings using AI. Users can input job descriptions and resumes, and the AI will provide a screening analysis.

## Features

*   **AI-Powered Screening:** Leverages AI to analyze job descriptions and resumes, providing insights into candidate suitability.
*   **Job Input Form:** A user-friendly form to submit job details and upload resumes.
*   **Results Display:** Clear and concise presentation of the AI's screening results.
*   **User Authentication:** Secure user login and registration with email/password and Google OAuth.
*   **Responsive Design:** The application is designed to work on various screen sizes.
*   **Dark Mode:** Includes a theme toggler for light and dark mode.

## Tech Stack

*   **Frontend:** React, TypeScript, Vite
*   **Styling:** Tailwind CSS, Radix UI, shadcn/ui
*   **State Management:** Zustand
*   **Data Fetching:** React Query
*   **Form Handling:** React Hook Form, Zod
*   **Routing:** React Router
*   **Animation:** Framer Motion
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

### Environment Variables

Create a `.env` file in the root of the project and add the following environment variable:

```
VITE_BASE_API_URL=http://localhost:3000
```

You can refer to the `.env.example` file for a template.

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

## Testing

Currently, there are no automated tests in this project. This is a key area for improvement. Adding a testing framework like Vitest or React Testing Library is highly recommended to ensure the quality and reliability of the application.

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration for routing.

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
├── .env.example
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
