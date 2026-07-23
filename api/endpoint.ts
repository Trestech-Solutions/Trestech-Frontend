type ID = string | number;

const API_ENDPOINTS = {
  auth: {
    login:          "/auth/login/",
    refresh:        "/auth/refresh/",
    logout:         "/auth/logout/",
    forgotPassword: "/auth/forgot-password/",
    resetPassword:  "/auth/reset-password/",
  },

  users: {
    list:   "/users/",
    create: "/users/",
    detail: (id: ID) => `/users/${id}/`,
    update: (id: ID) => `/users/${id}/`,
    delete: (id: ID) => `/users/${id}/`,
  },

  roles: {
    list:   "/roles/",
    create: "/roles/",
    detail: (id: ID) => `/roles/${id}/`,
    update: (id: ID) => `/roles/${id}/`,
    delete: (id: ID) => `/roles/${id}/`,
  },

  groups: {
    list:   "/groups/",
    create: "/groups/",
    detail: (id: ID) => `/groups/${id}/`,
    update: (id: ID) => `/groups/${id}/`,
    delete: (id: ID) => `/groups/${id}/`,
  },

  restaurants: {
    list:   "/restaurants/",
    create: "/restaurants/",
    detail: (id: ID) => `/restaurants/${id}/`,
    update: (id: ID) => `/restaurants/${id}/`,
    delete: (id: ID) => `/restaurants/${id}/`,
  },
} as const;

export default API_ENDPOINTS;
