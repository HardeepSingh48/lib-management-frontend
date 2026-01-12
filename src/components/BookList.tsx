import { useQuery, useMutation } from '@apollo/client';
import { LIST_BOOKS, LIST_MEMBERS, BORROW_BOOK, RETURN_BOOK } from '../graphql/queries';
import type { Book, Member } from '../types/library.types';
import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import './BookList.css';

export function BookList() {
    const [selectedMemberId, setSelectedMemberId] = useState<number>(0);
    const [operatingBookId, setOperatingBookId] = useState<number | null>(null);

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
            setOperatingBookId(null);
        },
    });

    const [returnBook, { loading: returnLoading, error: returnError }] = useMutation<
        { returnBook: Book },
        { bookId: number; memberId: number }
    >(RETURN_BOOK, {
        refetchQueries: [{ query: LIST_BOOKS }],
        onCompleted: () => {
            setOperatingBookId(null);
        },
    });

    const handleBorrow = async (bookId: number) => {
        if (selectedMemberId === 0) {
            alert('Please select a member first');
            return;
        }
        setOperatingBookId(bookId);
        try {
            await borrowBook({ variables: { bookId, memberId: selectedMemberId } });
        } catch (error) {
            console.error('Error borrowing book:', error);
            setOperatingBookId(null);
        }
    };

    const handleReturn = async (bookId: number) => {
        if (selectedMemberId === 0) {
            alert('Please select a member first');
            return;
        }
        setOperatingBookId(bookId);
        try {
            await returnBook({ variables: { bookId, memberId: selectedMemberId } });
        } catch (error) {
            console.error('Error returning book:', error);
            setOperatingBookId(null);
        }
    };

    if (booksLoading || membersLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading library data...</p>
            </div>
        );
    }

    if (booksError) {
        return (
            <div className="error-container">
                <p>Error loading books: {booksError.message}</p>
            </div>
        );
    }

    const books = booksData?.listBooks || [];
    const members = membersData?.listMembers || [];

    const memberOptions = [
        { value: 0, label: '-- Select a member --' },
        ...members.map(member => ({ value: member.id, label: member.name }))
    ];

    return (
        <div className="book-list-container">
            <div className="book-list-header">
                <h2>Library Collection</h2>
                <p className="book-count">{books.length} {books.length === 1 ? 'book' : 'books'} available</p>
            </div>

            {(borrowError || returnError) && (
                <div className="error-banner">
                    {borrowError?.message || returnError?.message}
                </div>
            )}

            <Card className="member-selector-card">
                <Select
                    label="Select Member for Borrow/Return"
                    options={memberOptions}
                    value={selectedMemberId}
                    onChange={(e) => setSelectedMemberId(Number(e.target.value))}
                />
            </Card>

            {books.length === 0 ? (
                <div className="empty-state">
                    <svg className="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h3>No books yet</h3>
                    <p>Add some books to get started with your library!</p>
                </div>
            ) : (
                <div className="books-grid">
                    {books.map((book) => (
                        <Card key={book.id} className={`book-card ${book.available ? 'available' : 'borrowed'}`}>
                            <div className="book-header">
                                <h3 className="book-title">{book.title}</h3>
                                <span className={`status-badge ${book.available ? 'available' : 'borrowed'}`}>
                                    {book.available ? 'Available' : 'Borrowed'}
                                </span>
                            </div>
                            <p className="book-author">by {book.author}</p>
                            <div className="book-actions">
                                {book.available ? (
                                    <Button
                                        onClick={() => handleBorrow(book.id)}
                                        disabled={borrowLoading || selectedMemberId === 0}
                                        variant="success"
                                        fullWidth
                                        isLoading={borrowLoading && operatingBookId === book.id}
                                    >
                                        Borrow Book
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => handleReturn(book.id)}
                                        disabled={returnLoading || selectedMemberId === 0}
                                        variant="secondary"
                                        fullWidth
                                        isLoading={returnLoading && operatingBookId === book.id}
                                    >
                                        Return Book
                                    </Button>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
