const env = process.env.NODE_ENV

const config = {
  production: {
    API_URL: 'https://api.listthis.tdib.xyz',
    BASE_URL: 'https://listthis.tdib.xyz',
  },
  development: {
    API_URL: 'http://localhost:5000',
    BASE_URL: 'http://localhost:3000',
  },
}

export default config[env]