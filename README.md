# Mini Library Management System - Frontend

A modern, production-ready React frontend for the Mini Library Management System with full type safety and real-time updates.

## 🚀 Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript (strict mode, 100% type-safe)
- **GraphQL Client**: Apollo Client 3
- **Validation**: Zod schemas
- **Styling**: Modern CSS with gradients and animations

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── AddBookForm.tsx       # Add book form with validation
│   │   ├── AddMemberForm.tsx     # Add member form with validation
│   │   └── BookList.tsx          # Book list with borrow/return
│   ├── graphql/
│   │   └── queries.ts            # GraphQL queries and mutations
│   ├── types/
│   │   └── library.types.ts      # TypeScript type definitions
│   ├── validations/
│   │   └── library.validation.ts # Zod validation schemas
│   ├── apollo-client.ts          # Apollo Client configuration
│   ├── App.tsx                   # Main application component
│   ├── App.css                   # Application styles
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global styles
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
- **View all books** with availability status
- **Add new books** with title and author
- **Real-time updates** after mutations
- **Visual indicators** for available/borrowed status

### 👥 Member Management
- **Add new members** to the library
- **Select members** for borrow/return operations
- **Dropdown selection** for easy member choice

### 🔄 Borrow/Return System
- **Borrow books** (only if available)
- **Return books** (only if borrowed)
- **Member selection** required for operations
- **Validation** prevents invalid operations

### 🎨 UI/UX Features
- **Modern gradient design** with glassmorphism
- **Responsive layout** for all screen sizes
- **Loading states** for async operations
- **Error messages** with clear feedback
- **Form validation** with Zod
- **Hover effects** and animations

## 🔍 Component Overview

### AddBookForm
- Form to add new books
- Zod validation for title and author
- Real-time error display
- Refetches book list on success

### AddMemberForm
- Form to add new members
- Zod validation for name
- Real-time error display
- Refetches member list on success

### BookList
- Displays all books in a grid
- Shows availability status
- Member selector for borrow/return
- Handles borrow/return mutations
- Real-time updates

## ✅ Validation Rules

Client-side validation matches backend:

- **Book Title**: Required, max 255 characters
- **Author**: Required, max 255 characters
- **Member Name**: Required, max 255 characters
- **Member Selection**: Required for borrow/return

## 🚨 Error Handling

- **GraphQL errors** displayed in UI
- **Validation errors** shown per field
- **Network errors** handled gracefully
- **Loading states** prevent duplicate submissions

## 🎯 Type Safety

- **Zero `any` types** in the entire codebase
- **Strict TypeScript** configuration
- **Type-safe GraphQL** operations
- **Zod schema inference** for forms

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design Features

### Color Scheme
- **Primary Gradient**: Purple to violet (`#667eea` → `#764ba2`)
- **Available Books**: Green border and badge
- **Borrowed Books**: Orange border and badge
- **Buttons**: Gradient backgrounds with hover effects

### Responsive Design
- **Desktop**: Two-column layout (forms | books)
- **Tablet**: Single column with optimized spacing
- **Mobile**: Full-width cards and forms

### Animations
- **Hover effects** on cards and buttons
- **Transform animations** on interactions
- **Smooth transitions** throughout
- **Loading spinners** for async operations

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

- **Apollo Client** with network-only fetch policy
- **Component composition** for reusability
- **Centralized validation** with Zod
- **Type-safe GraphQL** operations
- **Error boundaries** for graceful failures
- **Optimistic UI updates** via refetchQueries

## 🎯 Production Ready

- ✅ Full type safety (no `any`)
- ✅ Input validation on all forms
- ✅ Error handling throughout
- ✅ Loading states for UX
- ✅ Responsive design
- ✅ Modern, professional UI
- ✅ Real-time data updates
- ✅ Accessibility considerations

## 📦 Dependencies

```json
{
  "@apollo/client": "^3.x",
  "graphql": "^16.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "zod": "^3.x"
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
- **ES2020 target**
