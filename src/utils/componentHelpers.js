/**
 * Component Helper Utilities
 * Functions for categorizing and getting icons for components
 */

/**
 * Categorize a component based on its type and path
 * @param {string} componentType - The component type string
 * @param {string} path - The component file path
 * @returns {string} The category name
 */
export const categorizeComponent = (componentType, path) => {
  const lowerType = componentType.toLowerCase();
  const lowerPath = (path || "").toLowerCase();

  // Hero components
  if (lowerType.includes("hero")) return "hero";

  // Layout components
  if (
    lowerType.includes("header") ||
    lowerType.includes("footer") ||
    lowerType.includes("navigation") ||
    lowerType.includes("nav") ||
    lowerType.includes("layout")
  )
    return "layout";

  // CTA components
  if (
    lowerType.includes("cta") ||
    lowerType.includes("calltoaction") ||
    lowerType.includes("contact") ||
    lowerType.includes("demo")
  )
    return "cta";

  // FAQ components
  if (lowerType.includes("faq") || lowerType.includes("questions"))
    return "faq";

  // Pricing components
  if (
    lowerType.includes("pricing") ||
    lowerType.includes("price") ||
    lowerType.includes("plan") ||
    lowerType.includes("subscription")
  )
    return "pricing";

  // About/Team components
  if (
    lowerType.includes("about") ||
    lowerType.includes("team") ||
    lowerType.includes("member") ||
    lowerType.includes("staff") ||
    lowerPath.includes("about/")
  )
    return "about";

  // Features/Benefits components
  if (
    lowerType.includes("feature") ||
    lowerType.includes("benefit") ||
    lowerType.includes("advantage")
  )
    return "features";

  // Testimonials/Reviews
  if (
    lowerType.includes("testimonial") ||
    lowerType.includes("review") ||
    lowerType.includes("feedback")
  )
    return "testimonials";

  // Solution components
  if (lowerPath.includes("solution/") || lowerType.includes("solution"))
    return "solution";

  // Services components
  if (lowerPath.includes("services/") || lowerType.includes("service"))
    return "services";

  // Industry components
  if (lowerPath.includes("industries/") || lowerType.includes("industry"))
    return "industry";

  // Portfolio/Gallery
  if (
    lowerType.includes("portfolio") ||
    lowerType.includes("gallery") ||
    lowerType.includes("showcase")
  )
    return "portfolio";

  // Blog/News
  if (
    lowerType.includes("blog") ||
    lowerType.includes("news") ||
    lowerType.includes("article")
  )
    return "blog";

  // Default to content
  return "content";
};

/**
 * Get icon for a component based on its type and category
 * @param {string} componentType - The component type string
 * @param {string} category - The component category
 * @returns {string} The icon emoji
 */
export const getComponentIcon = (componentType, category) => {
  const type = componentType.toLowerCase();

  // Specific component icons
  if (type.includes("hero")) return "";
  if (type.includes("header")) return "";
  if (type.includes("footer")) return "";
  if (type.includes("navigation") || type.includes("nav")) return "";
  if (type.includes("sidebar")) return "";
  if (type.includes("image") || type.includes("gallery")) return "";
  if (type.includes("video")) return "";
  if (type.includes("carousel") || type.includes("slider")) return "";
  if (type.includes("form") || type.includes("contact")) return "";
  if (type.includes("button")) return "";
  if (type.includes("modal")) return "";
  if (type.includes("dropdown")) return "";
  if (type.includes("table")) return "";
  if (type.includes("list")) return "";
  if (type.includes("grid")) return "";
  if (type.includes("chart")) return "";
  if (type.includes("statistics") || type.includes("stats")) return "";
  if (type.includes("product") || type.includes("shop")) return "";
  if (type.includes("cart")) return "";
  if (type.includes("checkout")) return "";
  if (type.includes("pricing")) return "";

  // Category-based icons
  switch (category) {
    case "hero":
      return "";
    case "layout":
      return "";
    case "cta":
      return "";
    case "faq":
      return "";
    case "pricing":
      return "";
    case "about":
      return "";
    case "features":
      return "";
    case "testimonials":
      return "";
    case "solution":
      return "";
    case "services":
      return "";
    case "industry":
      return "";
    case "portfolio":
      return "";
    case "blog":
      return "";
    case "content":
      return "";
    default:
      return "";
  }
};

