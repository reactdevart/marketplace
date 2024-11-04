export const handleApiError = (error) => {
  if (error?.data?.message) {
    return error.data.message;
  }
  return 'An error occurred. Please try again.';
};
