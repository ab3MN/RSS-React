export const handleError = (err: unknown) => (err instanceof Error ? err.message : 'An unknown error occurred');
