export interface BlogResponse {
    attributes: {
        title: string;
        description: string;
        content: string;
        createdAt: string;
        updatedAt: string;
    };
    id: number;
}
export interface DataResponse {
    data: BlogResponse[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}
export declare const initialValueBlogs: {
    data: {
        attributes: {
            title: string;
            description: string;
            content: string;
            createdAt: string;
            updatedAt: string;
        };
        id: number;
    }[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
};
