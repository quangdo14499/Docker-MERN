export interface BlogResponse {
  attributes: {
    title: string
    description: string
    content: string
    createdAt: string
    updatedAt: string
  }
  id: number
}

export interface DataResponse {
  data: BlogResponse[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export const initialValueBlogs = {
  data: [
    {
      attributes: {
        title: '',
        description: '',
        content: '',
        createdAt: '',
        updatedAt: '',
      },
      id: 0,
    },
  ],
  meta: {
    pagination: {
      page: 0,
      pageSize: 0,
      pageCount: 0,
      total: 0,
    },
  },
}