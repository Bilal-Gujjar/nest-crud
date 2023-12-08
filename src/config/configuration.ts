export default () => ({
  database: {
    uri: process.env.DATABASE_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  // Add other configurations as needed
});
