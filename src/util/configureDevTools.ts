// Load initSW plugin only on production
const configureDevTools = () => {
  process.env.NODE_ENV === 'production' && require('./initSW');
};

export default configureDevTools;
