// Load offline plugin only on production
const configureDevTools = () => {
  process.env.NODE_ENV === 'production' && require('./offline');
  process.env.NODE_ENV === 'development' && require('preact/devtools');
};

export default configureDevTools;
