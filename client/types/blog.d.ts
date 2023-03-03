import { AxiosResponse } from 'axios';
import { CreateRequest, EditRequest, Query } from './request/BlogRequest';
import { BlogResponse, DataResponse } from './response/BlogResponse';
declare class Blog {
    createBlog: (body: CreateRequest) => Promise<AxiosResponse<BlogResponse>>;
    getBlog: (query: Query) => Promise<AxiosResponse<DataResponse>>;
    deleteBlog: (id: number) => Promise<AxiosResponse<{
        data: BlogResponse;
    }>>;
    editBlog: (item: EditRequest) => Promise<AxiosResponse<{
        data: BlogResponse;
    }>>;
}
declare const blog: Blog;
export default blog;
