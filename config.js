module.exports = {
    MONGO_URI: process.env.APPLICANTS_254_MLAB_MONGO_URI,
    MYSQL_CREDENTIALS: {
        host: process.env.APPLICANTS_254_MYSQL_HOST,
        user: process.env.APPLICANTS_254_MYSQL_USER,
        password: process.env.APPLICANTS_254_MYSQL_PASSWORD,
        database: process.env.APPLICANTS_254_MYSQL_DB
    }
};
