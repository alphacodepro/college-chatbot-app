# AI Educational Chatbot Widget

## Overview

This is a full-stack web application that provides an AI-powered chatbot widget specifically designed for educational institutions like schools and colleges. The chatbot offers an easy-to-integrate solution that can be embedded into any educational website to help students, parents, and visitors find information quickly through conversational interactions.

The application features a comprehensive knowledge base covering admissions, academics, campus life, and support topics with guided menu navigation and intelligent search capabilities. The widget is designed to be mobile-responsive, customizable, and requires minimal technical setup for deployment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Styling**: Tailwind CSS with shadcn/ui component library providing a consistent, professional design system
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Components**: Radix UI primitives for accessible, unstyled components with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript for consistent type safety across the full stack
- **Database Integration**: Drizzle ORM with PostgreSQL for data persistence and type-safe database operations
- **Session Management**: In-memory storage with fallback to database persistence for chat sessions and conversation history
- **API Design**: RESTful endpoints for chat session management and message handling

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Neon Database serverless hosting for scalability
- **ORM**: Drizzle ORM for type-safe database queries and schema management
- **Schema**: Structured tables for chat sessions, messages, and user data with JSON fields for flexible conversation history storage
- **Session Storage**: Hybrid approach using in-memory storage for performance with database persistence for reliability

### Chat System Architecture
- **Knowledge Base**: Structured hierarchical menu system with predefined responses for common educational queries
- **Conversation Flow**: Context-aware navigation with menu stack tracking and breadcrumb functionality
- **Message Handling**: Real-time message processing with typing indicators and animated responses
- **Search Functionality**: Instant search capabilities across the knowledge base with fallback responses

### Development & Deployment
- **Development Environment**: Replit-optimized configuration with hot module replacement and runtime error overlays
- **Code Quality**: TypeScript strict mode with path aliases for clean imports and better developer experience
- **Build Process**: Separate client and server builds with ESBuild for server-side bundling and Vite for client-side optimization

## External Dependencies

### Database & Hosting
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling and automatic scaling
- **Replit**: Development and hosting platform with integrated deployment capabilities

### UI & Component Libraries
- **Radix UI**: Comprehensive set of accessible UI primitives including dialogs, dropdowns, tooltips, and form components
- **Lucide React**: Modern icon library providing consistent iconography throughout the application
- **Class Variance Authority**: Type-safe CSS class management for component variants
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens and responsive design capabilities

### State Management & Data Fetching
- **TanStack Query**: Powerful data synchronization library for server state management with caching, background updates, and optimistic updates
- **React Hook Form**: Performant form library with minimal re-renders and built-in validation

### Development Tools
- **Drizzle Kit**: Database migration and introspection tools for schema management
- **ESBuild**: Fast JavaScript bundler for server-side code compilation
- **PostCSS**: CSS post-processing with Tailwind CSS integration and autoprefixer

### Runtime Dependencies
- **date-fns**: Modern date utility library for timestamp formatting and date manipulation
- **clsx**: Utility for constructing className strings conditionally
- **nanoid**: Secure URL-friendly unique string ID generator for session management