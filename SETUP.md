# Mage Frame - Setup Guide

## Overview
Mage Frame is a Next.js-based web application that provides task management functionality. It's built with modern technologies including TypeScript, Tailwind CSS, and PostgreSQL.

## Prerequisites
- Node.js (Latest LTS version recommended)
- PostgreSQL database
- npm or yarn package manager

## Project Structure
```
mage-frame/
├── src/
│   ├── app/          # Next.js app directory (pages and layouts)
│   ├── components/   # Reusable React components
│   ├── contexts/     # React context providers
│   ├── hooks/        # Custom React hooks
│   ├── services/     # API and service layer
│   ├── utils/        # Utility functions
│   └── assets/       # Static assets
├── public/           # Public static files
└── [config files]    # Various configuration files
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd mage-frame
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory with the following variables:
   ```
   DATABASE_URL=your_postgresql_connection_string
   ```

4. **Database Setup**
   - Ensure PostgreSQL is running
   - Create a new database
   - Update the DATABASE_URL in your .env.local file

5. **Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at `http://localhost:2040`

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Key Technologies

- **Frontend Framework**: Next.js 15.3.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **UI Components**: 
  - Radix UI
  - Heroicons
  - Custom components with Tailwind

## API Documentation
A Postman collection is available in the root directory (`TaskManagement.postman_collection.json`) for API testing and documentation.

## Development Guidelines

1. **Code Style**
   - Follow TypeScript best practices
   - Use ESLint for code linting
   - Follow the existing project structure

2. **Component Development**
   - Place reusable components in `src/components`
   - Use TypeScript interfaces for props
   - Follow the existing component patterns

3. **State Management**
   - Use React Context for global state
   - Keep component state local when possible
   - Use custom hooks for shared logic

## Troubleshooting

1. **Port Conflicts**
   - The application runs on port 2040 by default
   - If the port is in use, modify the port in package.json scripts

2. **Database Connection**
   - Ensure PostgreSQL is running
   - Verify DATABASE_URL in .env.local
   - Check database permissions

3. **Build Issues**
   - Clear .next directory
   - Remove node_modules and reinstall dependencies
   - Check TypeScript compilation errors

## Support
For any issues or questions, please refer to the project's issue tracker or contact the development team. 