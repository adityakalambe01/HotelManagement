const nodeEnv = {
    PRODUCTION_ENV: 'production',
    DEVELOPMENT_ENV: 'development',
    TEST_ENV: 'test'
}

const prefixURLs = {
    PRODUCTION_PREFIX_URL: '',
    DEVELOPMENT_PREFIX_URL: '/api/dev',
    TEST_PREFIX_URL: '/api/test'
}

module.exports = {nodeEnv, prefixURLs};