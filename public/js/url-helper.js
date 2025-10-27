// URL Helper - Dynamically detects base path for dev/prod
const URLHelper = (() => {
  let basePath = "";

  // Detect base path from current script location
  const detectBasePath = () => {
    const path = window.location.pathname;

    // Check if we're in a subdirectory (like /hng-twig/)
    const match = path.match(/^(\/[\w-]+)\//);

    if (match && match[1] !== "/") {
      basePath = match[1];
    } else {
      basePath = "";
    }

    return basePath;
  };

  // Initialize on load
  detectBasePath();

  return {
    // Get the base path
    getBasePath: () => basePath,

    // Build a full URL with base path
    url: (path) => {
      // Ensure path starts with /
      const cleanPath = path.startsWith("/") ? path : "/" + path;
      return basePath + cleanPath;
    },

    // Navigate to a URL with base path
    navigate: (path) => {
      window.location.href = URLHelper.url(path);
    },

    // Get current path without base
    getCurrentPath: () => {
      const fullPath = window.location.pathname;
      return fullPath.replace(basePath, "") || "/";
    },
  };
})();
