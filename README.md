# CodeSplainer - AI powered app for explaining any code in github

CodeSplainer is a cutting-edge AI Powered React application for users to search for and enter Github repositories and have the code explined to them via OpanAi API. It leverages Vite as the build tool, TypeScript for type safety, Tailwind CSS for styling, React Query for data caching, Clerk for authentication, Framer Motion for delightful animations, and integrates code splitting, custom hooks, and a modern architecture for better organization and scalability.

## Features

- **Vite**: A fast development server and build tool.
- **TypeScript**: Adds static typing to JavaScript for enhanced tooling and error detection.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Query**: A data-fetching library for React applications, providing caching and synchronization.
- **Authentication with Clerk**: Simplifies user authentication with secure and customizable flows.
- **Framer Motion**: Adds fluid animations and gestures to your React components.
- **Code Splitting**: Enhances performance by splitting your code into smaller chunks that are loaded on demand.
- **Custom Hooks**: Encapsulates reusable logic for better code organization and reusability.
- **Modern Architecture**: Utilizes a modern architecture pattern for improved scalability and maintainability.
- **AI-Powered Repository Explainer**: Utilizes the OpenAI API to allow users to explain the code

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   ```

2. Install dependencies:

   ```bash
   cd your-repo
   npm install
   ```

3. Configure Clerk:

   - Sign up for a Clerk account at [Clerk](https://www.clerk.dev/).
   - Create a new project and configure authentication settings.
   - Copy your Clerk API keys and paste them into the `.env` file:

   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_api_key
   ```

4. Add server URL:

   - Add the erver URL to your `.env`.

   ```env
   VITE_API_URL=https://codeexplainserver-production.up.railway.app/api
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```
