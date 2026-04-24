export function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

export function renderStars(rating) {
  const rounded = Math.round(rating);
  return "★".repeat(rounded).padEnd(5, "☆");
}
