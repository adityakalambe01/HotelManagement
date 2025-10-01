const redisClient = require('./redisClient');

// Save value (with optional expiry in seconds)
exports.save = async (key, value, expiry = null) => {
    if (expiry) {
        return await redisClient.set(key, JSON.stringify(value), { EX: expiry });
    }
    return await redisClient.set(key, JSON.stringify(value));
}

// Get value
exports.get = async (key) => {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
}

// Update = just overwrite
exports.update = async (key, value, expiry = null) => {
    return this.save(key, value, expiry);
}

// Delete key
exports.delete = async (key) => {
    return await redisClient.del(key);
}

// Find keys by pattern
exports.find = async (pattern) => {
    const keys = await redisClient.keys(pattern);
    return keys;
}

