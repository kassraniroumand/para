"use client";

import * as api from "@/app/utils/axios-utils";

// User endpoints
interface User {
  id: string;
  name: string;
  email: string;
}

export const UserService = {
  getCurrentUser: () => api.get<User>("/user/profile"),
  updateProfile: (data: Partial<User>) => api.put<User>("/user/profile", data),
};

// Todo endpoints
interface Todo {
  id: string;
  content: string;
  completed: boolean;
  createdAt: string;
}

interface CreateTodoInput {
  content: string;
}

interface UpdateTodoInput {
  content?: string;
  completed?: boolean;
}

export const TodoService = {
  list: () => api.get<Todo[]>("todos"),
  getById: (id: string) => api.get<Todo>(`todos/${id}`),
  create: (data: CreateTodoInput) => api.post<Todo>("todos", data),
  update: (id: string, data: UpdateTodoInput) => api.patch<Todo>(`todos/${id}`, data),
  delete: (id: string) => api.del<void>(`todos/${id}`),
  complete: (id: string) => api.patch<Todo>(`todos/${id}/complete`, { completed: true }),
};

// Example of a service with custom error handling
export const AnalyticsService = {
  async trackEvent(eventName: string, eventData: any): Promise<boolean> {
    try {
      await api.post("/analytics/events", { name: eventName, data: eventData });
      return true;
    } catch (error) {
      // Silent fail for analytics
      console.error("Failed to track analytics event:", error);
      return false;
    }
  },
};
