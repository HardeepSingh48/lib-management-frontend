import { z } from 'zod';

export const addBookSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
    author: z.string().min(1, 'Author is required').max(255, 'Author is too long'),
});

export const addMemberSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
});

export const borrowReturnSchema = z.object({
    bookId: z.number().int().positive('Please select a book'),
    memberId: z.number().int().positive('Please select a member'),
});

export type AddBookInput = z.infer<typeof addBookSchema>;
export type AddMemberInput = z.infer<typeof addMemberSchema>;
export type BorrowReturnInput = z.infer<typeof borrowReturnSchema>;
