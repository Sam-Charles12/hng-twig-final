// Authentication Module

const Auth = (() => {
  const SESSION_STORAGE_KEY = "ticketapp_session";

  // Private state
  let currentUser = null;
  let sessionToken = null;

  // Initialize from localStorage
  const initialize = () => {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.token && parsed.user) {
          currentUser = parsed.user;
          sessionToken = parsed.token;
        }
      }
    } catch (error) {
      console.error("Failed to read stored session", error);
    }
  };

  // Persist session to localStorage
  const persistSession = (user) => {
    const session = {
      token: `session-${Date.now()}`,
      user: user,
    };

    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch (error) {
      console.error("Failed to persist session", error);
    }

    currentUser = user;
    sessionToken = session.token;
  };

  // Clear session from localStorage
  const clearSession = () => {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear session", error);
    }
    currentUser = null;
    sessionToken = null;
  };

  // Public API
  return {
    // Initialize auth on page load
    init: () => {
      initialize();
    },

    // Login function (Mock - client-side only)
    login: async (email, password) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (email && password) {
        const mockUser = {
          id: "1",
          email: email,
          name: email.split("@")[0],
          role: email.includes("admin") ? "admin" : "user",
        };
        persistSession(mockUser);
        return { success: true, user: mockUser };
      }

      return { success: false, error: "Please provide email and password" };
    },

    // Register function (Mock - client-side only)
    register: async (name, email, password) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (name && email && password) {
        const mockUser = {
          id: Date.now().toString(),
          email: email,
          name: name,
          role: "user",
        };
        persistSession(mockUser);
        return { success: true, user: mockUser };
      }

      return { success: false, error: "All fields are required" };
    },

    // Logout function
    logout: () => {
      clearSession();
      // Redirect to landing page using dynamic URL
      if (typeof URLHelper !== "undefined") {
        URLHelper.navigate("/");
      } else {
        window.location.href = "/";
      }
    },

    // Get current user
    getUser: () => {
      return currentUser;
    },

    // Get session token
    getToken: () => {
      return sessionToken;
    },

    // Check if authenticated
    isAuthenticated: () => {
      return !!(currentUser && sessionToken);
    },

    // Check if user is admin
    isAdmin: () => {
      return currentUser && currentUser.role === "admin";
    },
  };
})();

// Initialize auth on page load
document.addEventListener("DOMContentLoaded", () => {
  Auth.init();
});

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = Auth;
}
