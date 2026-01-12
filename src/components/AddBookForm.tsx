import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, LIST_BOOKS } from '../graphql/queries';
import { addBookSchema } from '../validations/library.validation';
import type { Book } from '../types/library.types';
import { ZodError } from 'zod';

interface AddBookFormProps {
    onSuccess?: () => void;
}

export function AddBookForm({ onSuccess }: AddBookFormProps) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [addBook, { loading, error: mutationError }] = useMutation<
        { addBook: Book },
        { title: string; author: string }
    >(ADD_BOOK, {
        refetchQueries: [{ query: LIST_BOOKS }],
        onCompleted: () => {
            setTitle('');
            setAuthor('');
            setErrors({});
            onSuccess?.();
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            const validated = addBookSchema.parse({ title, author });
            await addBook({ variables: validated });
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

    return (
        <div className="form-container">
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={errors.title ? 'error' : ''}
                        placeholder="Enter book title"
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                        id="author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className={errors.author ? 'error' : ''}
                        placeholder="Enter author name"
                    />
                    {errors.author && <span className="error-message">{errors.author}</span>}
                </div>

                {mutationError && (
                    <div className="error-message">
                        {mutationError.message}
                    </div>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Book'}
                </button>
            </form>
        </div>
    );
}
