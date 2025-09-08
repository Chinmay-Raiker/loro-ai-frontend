import { api } from "@/handlers/axios";

// Example: Posts/Content endpoints
// export interface Post {
//   id: string;
//   title: string;
//   content: string;
//   authorId: string;
//   createdAt: string;
// }

// export interface CreatePostRequest {
//   title: string;
//   content: string;
// }

// export const postsAPI = {
//   getPosts: (params?: { page?: number; limit?: number; search?: string }) =>
//     api.get<{ posts: Post[]; total: number; page: number }>("/posts", {
//       params,
//     }),

//   getPostById: (id: string) => api.get<Post>(`/posts/${id}`),

//   createPost: (data: CreatePostRequest) => api.post<Post>("/posts", data),

//   updatePost: (id: string, data: Partial<CreatePostRequest>) =>
//     api.put<Post>(`/posts/${id}`, data),

//   deletePost: (id: string) => api.delete(`/posts/${id}`),
// };

// Generic API functions for common patterns
export const genericAPI = {
  // Generic GET request
  get: <T>(endpoint: string, params?: any) => api.get<T>(endpoint, { params }),

  // Generic POST request
  post: <T>(endpoint: string, data?: any) => api.post<T>(endpoint, data),

  // Generic PUT request
  put: <T>(endpoint: string, data?: any) => api.put<T>(endpoint, data),

  // Generic DELETE request
  delete: <T>(endpoint: string) => api.delete<T>(endpoint),
};
