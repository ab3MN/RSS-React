export const getIdFromUrl = (url: string) => url.slice(0, -1).split('/').at(-1) as string;
