import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MEMBER, LIST_MEMBERS } from '../graphql/queries';
import { addMemberSchema } from '../validations/library.validation';
import type { Member } from '../types/library.types';
import { ZodError } from 'zod';

interface AddMemberFormProps {
    onSuccess?: () => void;
}

export function AddMemberForm({ onSuccess }: AddMemberFormProps) {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [addMember, { loading, error: mutationError }] = useMutation<
        { addMember: Member },
        { name: string }
    >(ADD_MEMBER, {
        refetchQueries: [{ query: LIST_MEMBERS }],
        onCompleted: () => {
            setName('');
            setErrors({});
            onSuccess?.();
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            const validated = addMemberSchema.parse({ name });
            await addMember({ variables: validated });
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
            <h2>Add New Member</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Member Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={errors.name ? 'error' : ''}
                        placeholder="Enter member name"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                {mutationError && (
                    <div className="error-message">
                        {mutationError.message}
                    </div>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Member'}
                </button>
            </form>
        </div>
    );
}
