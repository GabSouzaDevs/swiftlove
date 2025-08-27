# Overview

This is a romantic love letter web application built as a full-stack TypeScript project. The application presents a musical love declaration featuring references to various songs (primarily Taylor Swift), with an interactive and visually appealing interface. The frontend displays poetic paragraphs with highlighted song titles, floating animations, a music player component, and social sharing functionality. The backend provides a REST API foundation with user management capabilities and database integration.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built with **React 18** using TypeScript and follows a component-based architecture:

- **UI Framework**: Uses shadcn/ui components built on top of Radix UI primitives for accessibility and consistency
- **Styling**: Tailwind CSS with custom CSS variables for theming, including romantic color palette (rose-gold, deep-rose, soft-lavender)
- **Animations**: Framer Motion for smooth animations and transitions, particularly for floating hearts and interactive elements
- **State Management**: React Query (TanStack Query) for server state management with custom query client configuration
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite with React plugin for fast development and optimized builds

The frontend uses a custom design system with romantic themes, custom fonts (Playfair Display, Dancing Script, Inter), and animated elements to create an immersive love letter experience.

## Backend Architecture

The backend follows a **RESTful API** pattern using Express.js:

- **Framework**: Express.js with TypeScript for type safety
- **Architecture Pattern**: Layered architecture with routes, storage, and server separation
- **Storage Layer**: Interface-based design (`IStorage`) with memory implementation (`MemStorage`) that can be easily swapped for database implementations
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development Setup**: Custom Vite integration for SSR capabilities in development

The storage interface provides CRUD operations for user management, designed to be database-agnostic.

## Data Storage Solutions

**Current Implementation**: In-memory storage using `MemStorage` class for development and testing

**Database Integration Ready**: 
- Drizzle ORM configured for PostgreSQL with schema definitions
- Neon Database serverless PostgreSQL configured via `DATABASE_URL`
- User schema with UUID primary keys, unique usernames, and password fields
- Migration system ready with Drizzle Kit

The architecture supports easy migration from memory storage to PostgreSQL by implementing the `IStorage` interface with Drizzle ORM.

## Authentication and Authorization

Basic user management structure in place:
- User creation and retrieval by ID or username
- Password storage (note: needs hashing implementation for production)
- Session management foundation using `connect-pg-simple` for PostgreSQL session store
- No authentication middleware currently implemented (ready for JWT or session-based auth)

## External Dependencies

**Core Framework Dependencies**:
- React 18 with TypeScript
- Express.js for backend API
- Vite for build tooling and development server

**UI and Styling**:
- shadcn/ui component library with Radix UI primitives
- Tailwind CSS for utility-first styling
- Framer Motion for animations
- Lucide React for icons

**Data Management**:
- Drizzle ORM with PostgreSQL dialect
- Neon Database (@neondatabase/serverless)
- React Query for client-side data fetching
- Zod for schema validation

**Development Tools**:
- TypeScript for type safety
- ESBuild for production builds
- Replit-specific plugins for development environment integration

**Form and Validation**:
- React Hook Form with Hookform Resolvers
- Zod integration for form validation

The application is optimized for deployment on Replit with custom error overlays and development banners, while maintaining production-ready architecture patterns.