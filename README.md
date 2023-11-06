# Employee Supervisors

Welcome to the Employee Supervisors project!

This web application is built using **Next.js** with App Router and APIs, **Clerk** for authentication, and it uses **Shadcn UI** and **Tailwind CSS** for styling.

## Live Demo

You can access the live demo of this project at [https://employee-supervisors.vercel.app/](https://employee-supervisors.vercel.app/)

## Features

- Edit employee details, including name and supervisor
- Authentication using Clerk
- Responsive and visually appealing UI using Shadcn UI and Tailwind CSS

## Getting Started

To run this project on your local machine, follow these steps:

### Prerequisites

Make sure you have the following software installed:

- **Node.js**: Get it from the official website - [https://nodejs.org](https://nodejs.org)

### Clone the Repository

Clone this repository to your local machine using the following command:

```
git clone https://github.com/your-username/employee-supervisors.git
```

### Install Dependencies

Navigate to the cloned project directory and install the project dependencies using npm:

```bash
cd employee-supervisors
npm install
```


### Configure Clerk

Create an account on [https://www.clerk.dev](https://www.clerk.dev) and follow their documentation to set up your Clerk application. Once you have your Clerk credentials, create a `.env.local` file in the project root and add the following environment variables:

```dotenv
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
```

### Start the Local Development Server

To run the project in development mode, use the following command:

```bash
npm run dev
```


The development server will start running on [http://localhost:3000](http://localhost:3000). You can access it using your web browser.
