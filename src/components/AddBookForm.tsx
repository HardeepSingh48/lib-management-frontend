import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, LIST_BOOKS } from '../graphql/queries';
import { addBookSchema, type AddBookInput } from '../validations/library.validation';
import type { Book } from '../types/library.types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface AddBookFormProps {
    onSuccess?: () => void;
}

export function AddBookForm({ onSuccess }: AddBookFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<AddBookInput>({
        resolver: zodResolver(addBookSchema),
        mode: 'onBlur'
    });

    const [addBook, { loading, error: mutationError }] = useMutation<
        { addBook: Book },
        AddBookInput
    >(ADD_BOOK, {
        refetchQueries: [{ query: LIST_BOOKS }],
        onCompleted: () => {
            reset();
            onSuccess?.();
        },
    });

    const onSubmit = async (data: AddBookInput) => {
        try {
            await addBook({ variables: data });
        } catch (error) {
            // Error is handled by Apollo mutation error
            console.error('Error adding book:', error);
        }
    };

    return (
        <Card>
            <h2 style={{
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--spacing-lg)'
            }}>
                Add New Book
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                <Input
                    label="Book Title"
                    placeholder="Enter book title"
                    error={errors.title?.message}
                    {...register('title')}
                />

                <Input
                    label="Author Name"
                    placeholder="Enter author name"
                    error={errors.author?.message}
                    {...register('author')}
                />

                {mutationError && (
                    <div style={{
                        padding: 'var(--spacing-md)',
                        backgroundColor: '#fee2e2',
                        color: 'var(--color-danger)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--font-size-sm)'
                    }}>
                        {mutationError.message}
                    </div>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={loading || isSubmitting}
                >
                    Add Book
                </Button>
            </form>
        </Card>
    );
}

