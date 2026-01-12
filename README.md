# Mini Library Management System - Frontend

A modern, production-ready React frontend for the Mini Library Management System with full type safety, professional UI components, and an elegant design.

## 🚀 Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript (strict mode, 100% type-safe)
- **GraphQL Client**: Apollo Client 3
- **Form Management**: React Hook Form with Zod validation
- **Validation**: Zod schemas
- **Styling**: Modern CSS with custom properties and Inter font
- **UI Components**: Custom component library (Button, Input, Select, Card)

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── ui/                     # Reusable UI components
│   │   │   ├── Button.tsx          # Button component with variants
│   │   │   ├── Button.css
│   │   │   ├── Input.tsx           # Input component with validation
│   │   │   ├── Input.css
│   │   │   ├── Select.tsx          # Select dropdown component
│   │   │   ├── Select.css
│   │   │   ├── Card.tsx            # Card container component
│   │   │   ├── Card.css
│   │   │   └── index.ts            # UI components barrel export
│   │   ├── layout/                 # Layout components
│   │   │   ├── Layout.tsx          # Main layout with sidebar
│   │   │   └── Layout.css
│   │   ├── AddBookForm.tsx         # Add book form with react-hook-form
│   │   ├── AddMemberForm.tsx       # Add member form with react-hook-form
│   │   ├── BookList.tsx            # Book list with borrow/return
│   │   └── BookList.css
│   ├── graphql/
│   │   └── queries.ts              # GraphQL queries and mutations
│   ├── types/
│   │   ├── library.types.ts        # Library domain types
│   │   └── ui.types.ts             # UI component types
│   ├── validations/
│   │   └── library.validation.ts   # Zod validation schemas
│   ├── apollo-client.ts            # Apollo Client configuration
│   ├── App.tsx                     # Main application component
│   ├── App.css                     # Application styles
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Global styles & design system
├── package.json
└── tsconfig.json
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- Backend server running at `http://localhost:4000`

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## ✨ Features

### 📚 Book Management
- **View all books** with modern card-based layout
- **Add new books** using react-hook-form with Zod validation
- **Real-time updates** after mutations
- **Visual status indicators** for available/borrowed books

### 👥 Member Management
- **Add new members** with validated forms
- **Select members** for borrow/return operations
- **Dropdown selection** with custom Select component

### 🔄 Borrow/Return System
- **Borrow books** (only if available)
- **Return books** (only if borrowed)
- **Member selection** required for operations
- **Validation** prevents invalid operations
- **Loading states** during operations

### 🎨 UI/UX Features
- **Professional layout** with sidebar navigation
- **Custom UI component library** for consistency
- **Modern design system** with CSS custom properties
- **Inter font** for professional typography
- **Unique color palette** (not AI-generated looking)
- **Responsive design** for all screen sizes
- **Loading states** with spinners
- **Error messages** with clear feedback
- **Form validation** with react-hook-form + Zod
- **Hover effects** and smooth transitions
- **Accessibility features** (ARIA labels, keyboard navigation)

## 🔍 Component Overview

### UI Components

#### Button
Reusable button component with:
- Variants: primary, secondary, success, danger
- Sizes: small, medium, large
- Loading state support
- Full width option
- Full type safety

#### Input
Reusable input component with:
- Label support
- Error message display
- Helper text
- React Hook Form integration
- Accessibility features

#### Select
Reusable select dropdown with:
- Label support
- Error handling
- Custom styling
- Options array support

#### Card
Reusable card container with:
- Variants: default, outlined, elevated
- Consistent styling
- Hover effects

### Layout Components

#### Layout
Main layout component with:
- Header with branding
- Sidebar navigation
- Responsive design
- Sticky header

### Form Components

#### AddBookForm
- React Hook Form integration
- Zod validation with zodResolver
- Custom UI components
- Real-time error feedback
- Loading states

#### AddMemberForm
- React Hook Form integration
- Zod validation with zodResolver
- Custom UI components
- Real-time error feedback

#### BookList
- Custom UI components
- Member selection
- Borrow/return operations
- Loading and error states
- Empty state handling

## ✅ Validation Rules

Client-side validation matches backend:

- **Book Title**: Required, max 255 characters
- **Author**: Required, max 255 characters
- **Member Name**: Required, max 255 characters
- **Member Selection**: Required for borrow/return

## 🚨 Error Handling

- **GraphQL errors** displayed in UI
- **Validation errors** shown per field with react-hook-form
- **Network errors** handled gracefully
- **Loading states** prevent duplicate submissions

## 🎯 Type Safety

- **Zero `any` types** in the entire codebase
- **Strict TypeScript** configuration
- **Type-safe GraphQL** operations
- **Zod schema inference** for forms
- **Typed UI components** with proper interfaces

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb)
- **Secondary**: Cyan (#0891b2)
- **Success**: Green (#059669)
- **Danger**: Red (#dc2626)
- **Warning**: Orange (#d97706)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl

### Spacing
- CSS custom properties for consistent spacing
- Scale: xs, sm, md, lg, xl, 2xl, 3xl

### Shadows
- Elevation system with sm, md, lg, xl shadows
- Consistent depth hierarchy

## 🔗 GraphQL Operations

### Queries Used
- `listBooks` - Fetch all books
- `listMembers` - Fetch all members

### Mutations Used
- `addBook` - Create new book
- `addMember` - Create new member
- `borrowBook` - Borrow a book
- `returnBook` - Return a book

## 🧪 Testing the Application

1. **Start the backend server** (port 4000)
2. **Start the frontend** (port 5173)
3. **Test the flow:**
   - Add a new member
   - Add a new book
   - Select a member from dropdown
   - Borrow the book
   - Return the book
4. **Test validation:**
   - Try submitting empty forms
   - Try borrowing without selecting a member
   - Try borrowing an unavailable book

## 🏗️ Architecture Highlights

- **React Hook Form** for declarative form management
- **Zod** for runtime type validation
- **Apollo Client** with network-only fetch policy
- **Component composition** for reusability
- **Centralized validation** with Zod schemas
- **Type-safe GraphQL** operations
- **Custom UI component library** for consistency
- **CSS custom properties** for theming
- **Responsive layout** with CSS Grid and Flexbox

## 🎯 Production Ready

- ✅ Full type safety (no `any`)
- ✅ React Hook Form integration
- ✅ Input validation on all forms
- ✅ Error handling throughout
- ✅ Loading states for UX
- ✅ Responsive design
- ✅ Modern, professional UI
- ✅ Real-time data updates
- ✅ Accessibility considerations
- ✅ Custom component library
- ✅ Professional layout system

## 📦 Dependencies

```json
{
  "@apollo/client": "^3.11.11",
  "@hookform/resolvers": "^3.x",
  "graphql": "^16.12.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-hook-form": "^7.x",
  "zod": "^4.3.5"
}
```

## 🚀 Deployment

Build for production:
```bash
npm run build
```

The `dist` folder will contain the optimized production build.

## 🔧 Configuration

### Apollo Client
- **URI**: `http://localhost:4000`
- **Fetch Policy**: `network-only` (real-time data)
- **Error Policy**: `all` (show all errors)
- **Cache**: InMemoryCache with automatic updates

### TypeScript
- **Strict mode** enabled
- **No implicit any**
- **Strict null checks**
- **ES2022 target**

## 🎨 Design Philosophy

This application follows modern web design principles:
- **Professional aesthetics** - Not AI-generated looking
- **Consistent design system** - CSS custom properties
- **Reusable components** - DRY principle
- **Type safety first** - TypeScript everywhere
- **User experience** - Loading states, error handling, validation
- **Accessibility** - ARIA labels, semantic HTML
- **Performance** - Optimized builds, code splitting ready
