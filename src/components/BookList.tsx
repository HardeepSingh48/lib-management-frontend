import { useQuery, useMutation } from '@apollo/client';
import { LIST_BOOKS, LIST_MEMBERS, BORROW_BOOK, RETURN_BOOK } from '../graphql/queries';
import type { Book, Member } from '../types/library.types';
import { useState } from 'react';
import { ZodError } from 'zod';
import { borrowReturnSchema } from '../validations/library.validation';

export function BookList() {
    const [selectedBookId, setSelectedBookId] = useState<number>(0);
    const [selectedMemberId, setSelectedMemberId] = useState<number>(0);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { data: booksData, loading: booksLoading, error: booksError } = useQuery<{
        listBooks: Book[];
    }>(LIST_BOOKS);

    const { data: membersData, loading: membersLoading } = useQuery<{
        listMembers: Member[];
    }>(LIST_MEMBERS);

    const [borrowBook, { loading: borrowLoading, error: borrowError }] = useMutation<
        { borrowBook: Book },
        { bookId: number; memberId: number }
    >(BORROW_BOOK, {
        refetchQueries: [{ query: LIST_BOOKS }],
        onCompleted: () => {
            setSelectedBookId(0);
            setSelectedMemberId(0);
            setErrors({});
        },
    });

    const [returnBook, { loading: returnLoading, error: returnError }] = useMutation<
        { returnBook: Book },
        { bookId: number; memberId: number }
    >(RETURN_BOOK, {
        refetchQueries: [{ query: LIST_BOOKS }],
        onCompleted: () => {
            setSelectedBookId(0);
            setSelectedMemberId(0);
            setErrors({});
        },
    });

    const handleBorrow = async (bookId: number) => {
        setErrors({});
        setSelectedBookId(bookId);

        try {
            const validated = borrowReturnSchema.parse({ bookId, memberId: selectedMemberId });
            await borrowBook({ variables: validated });
        } catch (error) {
            if (error instanceof ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.issues.forEach((err) => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0].toString()] = err.message;
                    }
                });
                setErrors(fieldErrors);
            }
        }
    };

    const handleReturn = async (bookId: number) => {
        setErrors({});
        setSelectedBookId(bookId);

        try {
            const validated = borrowReturnSchema.parse({ bookId, memberId: selectedMemberId });
            await returnBook({ variables: validated });
        } catch (error) {
            if (error instanceof ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.issues.forEach((err) => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0].toString()] = err.message;
                    }
                });
                setErrors(fieldErrors);
            }
        }
    };

    if (booksLoading || membersLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (booksError) {
        return <div className="error-message">Error loading books: {booksError.message}</div>;
    }

    const books = booksData?.listBooks || [];
    const members = membersData?.listMembers || [];

    return (
        <div className="book-list-container">
            <h2>Library Books</h2>

            {(borrowError || returnError) && (
                <div className="error-message">
                    {borrowError?.message || returnError?.message}
                </div>
            )}

            {errors.memberId && (
                <div className="error-message">{errors.memberId}</div>
            )}

            <div className="member-selector">
                <label htmlFor="member-select">Select Member for Borrow/Return:</label>
                <select
                    id="member-select"
                    value={selectedMemberId}
                    onChange={(e) => setSelectedMemberId(Number(e.target.value))}
                    className={errors.memberId ? 'error' : ''}
                >
                    <option value={0}>-- Select a member --</option>
                    {members.map((member) => (
                        <option key={member.id} value={member.id}>
                            {member.name}
                        </option>
                    ))}
                </select>
            </div>

            {books.length === 0 ? (
                <p className="no-data">No books available. Add some books to get started!</p>
            ) : (
                <div className="books-grid">
                    {books.map((book) => (
                        <div key={book.id} className={`book-card ${book.available ? 'available' : 'borrowed'}`}>
                            <h3>{book.title}</h3>
                            <p className="author">by {book.author}</p>
                            <div className="book-status">
                                <span className={`status-badge ${book.available ? 'available' : 'borrowed'}`}>
                                    {book.available ? '✓ Available' : '✗ Borrowed'}
                                </span>
                            </div>
                            <div className="book-actions">
                                {book.available ? (
                                    <button
                                        onClick={() => handleBorrow(book.id)}
                                        disabled={borrowLoading || selectedMemberId === 0}
                                        className="btn-borrow"
                                    >
                                        {borrowLoading && selectedBookId === book.id ? 'Borrowing...' : 'Borrow'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleReturn(book.id)}
                                        disabled={returnLoading || selectedMemberId === 0}
                                        className="btn-return"
                                    >
                                        {returnLoading && selectedBookId === book.id ? 'Returning...' : 'Return'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
