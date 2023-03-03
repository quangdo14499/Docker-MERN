import { AxiosResponse } from 'axios';
import axiosClient from './axiosClient';
import { CreateRequest, EditRequest, Query } from './request/BlogRequest';
import { BlogResponse, DataResponse } from './response/BlogResponse';

class Blog {
    createBlog = (body: CreateRequest): Promise<AxiosResponse<BlogResponse>> => {
        return axiosClient.post(`http://localhost:3001/api/v1/blogs`, body);
    };

    getBlog = (query: Query): Promise<AxiosResponse<DataResponse>> => {
        return axiosClient.get(
            `http://localhost:3001/api/v1/blogs?pagination[pageSize]=${query.pageSize}&pagination[page]=${query.page}&sort=${query.sortBy}&filters[title][$contains]=${query.querySearch}`,
        );
    };

    deleteBlog = (id: number): Promise<AxiosResponse<{ data: BlogResponse }>> => {
        return axiosClient.delete(`http://localhost:3001/api/v1/blogs/${id}`);
    };

    editBlog = (item: EditRequest): Promise<AxiosResponse<{ data: BlogResponse }>> => {
        return axiosClient.put(`http://localhost:3001/api/v1/blogs/${item.id}`, {
            data: item.data,
        });
    };
}

const blog = new Blog();
export default blog;
