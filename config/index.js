const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://kiyoshi-next-search-plp.vercel.app';
