# Trinity Build – AI-Powered Web App Builder

Trinity Build is an AI-powered platform that allows users to effortlessly create stunning, AI-generated websites and web applications. With intelligent automation and seamless customization, Trinity Build is the future of web design.

## Features

- **AI-Powered Web App Creation**: Generate full-stack web applications with AI assistance.
- **Customizable Components**: Modify and deploy components tailored to your needs.
- **Integrated Chat**: Chat with AI to refine your ideas and get real-time suggestions.
- **Code Preview and Deployment**: View, edit, and deploy your code directly from the platform.
- **Token-Based System**: Manage your usage with tokens and upgrade plans as needed.
- **Third-Party Integrations**: Includes Google OAuth, PayPal for payments, and more.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org), React, Tailwind CSS
- **Backend**: Convex Database
- **Authentication**: Google OAuth
- **Payments**: PayPal Integration
- **AI Models**: Google Generative AI
- **Icons**: Lucide React
- **Other Libraries**: Axios, React-Markdown, Sonner, and more

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/swayamjain8/trinity-build.git
   cd trinity-build
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY=your-google-client-id
   NEXT_PUBLIC_GEMINI_API_KEY=your-google-generative-ai-key
   NEXT_PUBLIC_CONVEX_URL=your-convex-url
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id
   ```

4. Start the Convex database locally:

   ```bash
   npx convex dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Structure

```plaintext
trinity-build/
├── app/                     # Next.js app directory
│   ├── api/                 # API routes
│   ├── (main)/              # Main pages
│   ├── provider.jsx         # Global providers
│   ├── layout.js            # Root layout
│   ├── page.js              # Home page
├── components/              # Reusable components
│   ├── custom/              # Custom components
│   ├── ui/                  # UI components
├── context/                 # React context for global state
├── convex/                  # Convex database queries and mutations
├── data/                    # Static data and configurations
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── public/                  # Static assets
├── styles/                  # Global styles
├── .env.local.sample        # Sample environment variables
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint to check for code quality.

## Features in Detail

### AI Chat

- Chat with AI to brainstorm ideas and refine your project.
- AI generates suggestions and code snippets based on your input.

### Code Preview and Deployment

- View and edit your code in real-time using Sandpack.
- Deploy your project directly from the platform.

### Token-Based System

- Each user is allocated tokens for AI usage.
- Upgrade plans to get more tokens for extended usage.

### Authentication and Payments

- Secure login with Google OAuth.
- PayPal integration for upgrading plans.

## Environment Variables

| Variable                                | Description                  |
| --------------------------------------- | ---------------------------- |
| `NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY` | Google OAuth Client ID       |
| `NEXT_PUBLIC_GEMINI_API_KEY`            | Google Generative AI API Key |
| `NEXT_PUBLIC_CONVEX_URL`                | Convex Database URL          |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID`          | PayPal Client ID             |

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions, suggestions, or issues, please reach out:

- **Author**: Swayam Jain
- **Email**: [jainswyam4006@gmail.com](mailto:jainswyam4006@gmail.com)
- **Issues**: [GitHub Issues](https://github.com/swayamjain8/trinity-build/issues)
- **Website**: [Trinity Build](https://trinitybuild.vercel.app)

---

Thank you for using Trinity Build! 🚀
