export interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Member {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface AddBookInput {
    title: string;
    author: string;
}

export interface AddMemberInput {
    name: string;
}

export interface BorrowReturnInput {
    bookId: number;
    memberId: number;
}
