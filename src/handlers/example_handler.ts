import {
  authAPI,
  postsAPI,
  userAPI,
  type CreatePostRequest,
  type CreateUserRequest,
  type LoginRequest,
} from "@/api/api";

// Auth handlers
export const authHandlers = {
  // Handle user login
  login: async (credentials: LoginRequest) => {
    try {
      const response = await authAPI.login(credentials);
      console.log("Login successful:", response.data);

      // Store tokens and user data (uncomment when needed)
      // localStorage.setItem('token', response.data.access_token)
      // localStorage.setItem('refresh_token', response.data.refresh_token)
      // useLocalStore.getState().setCredentials({
      //   user: response.data.user,
      //   token: response.data.access_token,
      //   refreshToken: response.data.refresh_token,
      // })

      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  // Handle user registration
  register: async (userData: CreateUserRequest) => {
    try {
      const response = await authAPI.register(userData);
      console.log("Registration successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  },

  // Handle logout
  logout: async () => {
    try {
      await authAPI.logout();
      console.log("Logout successful");

      // Clear stored data (uncomment when needed)
      // localStorage.removeItem('token')
      // localStorage.removeItem('refresh_token')
      // useLocalStore.getState().logout()
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  },
};

// User handlers
export const userHandlers = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await userAPI.getProfile();
      console.log("Profile loaded:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to load profile:", error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (
    profileData: Partial<{ name: string; email: string }>
  ) => {
    try {
      const response = await userAPI.updateProfile(profileData);
      console.log("Profile updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  },

  // Get list of users with pagination
  getUsers: async (page = 1, limit = 10, search?: string) => {
    try {
      const response = await userAPI.getUsers({ page, limit });
      console.log(`Loaded ${response.data.users.length} users`);
      return response.data;
    } catch (error) {
      console.error("Failed to load users:", error);
      throw error;
    }
  },

  // Delete a user
  deleteUser: async (userId: string) => {
    try {
      await userAPI.deleteUser(userId);
      console.log(`User ${userId} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete user ${userId}:`, error);
      throw error;
    }
  },
};

// Posts handlers
export const postsHandlers = {
  // Get all posts with pagination
  getPosts: async (page = 1, limit = 10, search?: string) => {
    try {
      const response = await postsAPI.getPosts({ page, limit, search });
      console.log(`Loaded ${response.data.posts.length} posts`);
      return response.data;
    } catch (error) {
      console.error("Failed to load posts:", error);
      throw error;
    }
  },

  // Get single post by ID
  getPost: async (postId: string) => {
    try {
      const response = await postsAPI.getPostById(postId);
      console.log("Post loaded:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Failed to load post ${postId}:`, error);
      throw error;
    }
  },

  // Create new post
  createPost: async (postData: CreatePostRequest) => {
    try {
      const response = await postsAPI.createPost(postData);
      console.log("Post created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to create post:", error);
      throw error;
    }
  },

  // Update existing post
  updatePost: async (postId: string, postData: Partial<CreatePostRequest>) => {
    try {
      const response = await postsAPI.updatePost(postId, postData);
      console.log("Post updated:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Failed to update post ${postId}:`, error);
      throw error;
    }
  },

  // Delete post
  deletePost: async (postId: string) => {
    try {
      await postsAPI.deletePost(postId);
      console.log(`Post ${postId} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete post ${postId}:`, error);
      throw error;
    }
  },
};

// Generic handler for custom endpoints
export const genericHandlers = {
  // Generic GET handler
  get: async <T>(endpoint: string, params?: any): Promise<T> => {
    try {
      const response = await userAPI.getProfile(); // Replace with genericAPI.get when available
      return response.data as T;
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  },

  // Generic POST handler
  post: async <T>(endpoint: string, data?: any): Promise<T> => {
    try {
      // Implement generic post call
      throw new Error("Generic POST handler not yet implemented");
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  },
};
