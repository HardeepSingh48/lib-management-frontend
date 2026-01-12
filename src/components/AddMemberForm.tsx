import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { ADD_MEMBER, LIST_MEMBERS } from '../graphql/queries';
import { addMemberSchema, type AddMemberInput } from '../validations/library.validation';
import type { Member } from '../types/library.types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface AddMemberFormProps {
    onSuccess?: () => void;
}

export function AddMemberForm({ onSuccess }: AddMemberFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<AddMemberInput>({
        resolver: zodResolver(addMemberSchema),
        mode: 'onBlur'
    });

    const [addMember, { loading, error: mutationError }] = useMutation<
        { addMember: Member },
        AddMemberInput
    >(ADD_MEMBER, {
        refetchQueries: [{ query: LIST_MEMBERS }],
        onCompleted: () => {
            reset();
            onSuccess?.();
        },
    });

    const onSubmit = async (data: AddMemberInput) => {
        try {
            await addMember({ variables: data });
        } catch (error) {
            // Error is handled by Apollo mutation error
            console.error('Error adding member:', error);
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
                Add New Member
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                <Input
                    label="Member Name"
                    placeholder="Enter member name"
                    error={errors.name?.message}
                    {...register('name')}
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
                    Add Member
                </Button>
            </form>
        </Card>
    );
}
