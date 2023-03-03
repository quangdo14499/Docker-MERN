export interface CreateRequest {
    data: {
        title: string;
        description: string;
        content: string;
        author: string;
    };
}
export interface DeleteRequest {
    id: number;
    title: string;
}
export interface EditRequest {
    id: number;
    data: {
        title: string;
        description: string;
        content: string;
        author: string;
    };
}
export interface Query {
    page: number;
    pageSize: number;
    sortBy: string;
    querySearch: string;
}
export declare const initialValueEditItem: {
    attributes: {
        title: string;
        description: string;
        content: string;
        createdAt: string;
        updatedAt: string;
    };
    id: number;
};
export declare const initialValueDeleteItem: {
    id: number;
    title: string;
};
