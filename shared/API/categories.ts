export function fetchCategories() {
  return fetch('/api/categories')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
      throw error;
    });
}