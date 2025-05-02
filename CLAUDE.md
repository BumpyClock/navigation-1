# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands
- `pnpm dev` - Start the development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check for code issues

## Code Style Guidelines
- **Imports**: Use absolute imports with `@/` alias for src directory
- **Components**: Use function components with explicit return types
- **Styling**: Use Tailwind CSS with the `cn()` utility for class merging
- **Types**: Strong typing with TypeScript; avoid `any` type
- **Naming**: PascalCase for components, camelCase for variables/functions
- **UI Components**: Follow Radix UI + shadcn/ui patterns for consistency
- **State Management**: Use React hooks for local state
- **Error Handling**: Use try/catch blocks with specific error messages
- **Props**: Destructure props directly in function parameters
- **File Structure**: One component per file, nested component directories

## Project Architecture
- Next.js App Router with React 19
- Tailwind CSS for styling
- TypeScript for type safety
- Radix UI primitives with shadcn/ui components