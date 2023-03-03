import { initialValueBlogs } from './../response/BlogResponse'
export interface CreateRequest {
  data: {
    title: string
    description: string
    content: string
    author: string
  }
}

export interface DeleteRequest {
  id: number
  title: string
}

export interface EditRequest {
  id: number
  data: {
    title: string
    description: string
    content: string
    author: string
  }
}

export interface Query {
  page: number
  pageSize: number
  sortBy: string
  querySearch: string
}

export const initialValueEditItem = {
  attributes: {
    title: '',
    description: '',
    content: '',
    createdAt: '',
    updatedAt: '',
  },
  id: 0,
}

export const initialValueDeleteItem = {
  id: 0,
  title: '',
}
