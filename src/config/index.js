const {JOI, dotenv, httpStatus} = require("../package");
dotenv.config();

const envVarsSchema = JOI.object().keys({
    NODE_ENV: JOI.string()
        .valid('production', 'development', 'test')
        .description('Specifies the environment in which the application is running (e.g., development, production, or test)')
        .required(),

    PORT: JOI.number()
        .default(3000)
        .description('The port number on which the server will listen'),

    CORS_ORIGINS: JOI.string()
        .description('Comma-separated list of allowed client origins for CORS (e.g., https://example.com, http://localhost:3000)')
        .required(),

    MONGO_URI: JOI.string()
        .description('MongoDB connection string used to connect to the database')
        .required(),

    JWT_SECRET: JOI.string()
        .description('Secret key used for signing and verifying JSON Web Tokens (JWTs)')
        .required(),

    SMTP_PROVIDER: JOI.string()
        .valid("gmail", "titan", "custom")
        .description("The SMTP provider to use for sending transactional emails (e.g., gmail, titan, or custom)")
        .required(),

    SMTP_EMAIL: JOI.string()
        .email()
        .description("SMTP email address used for sending transactional emails like verification or password reset")
        .required(),

    SMTP_PASSWORD: JOI.string()
        .description("Password or app-specific token used to authenticate the SMTP email account")
        .required(),

    SMTP_HOST: JOI.string()
        .description("SMTP host address (e.g., smtp.gmail.com, smtp.titan.email)")
        .when("SMTP_PROVIDER", {
            is: JOI.valid("custom", "titan"),
            then: JOI.required(),
            otherwise: JOI.optional()
        }),

    SMTP_PORT: JOI.number()
        .description("SMTP port number (typically 587 for TLS, 465 for SSL)")
        .when("SMTP_PROVIDER", {
            is: JOI.valid("custom", "titan"),
            then: JOI.required(),
            otherwise: JOI.optional()
        }),

    SMTP_SECURE: JOI.string()
        .description("Set to true to use SSL (port 465), false for STARTTLS (port 587)")
        .when("SMTP_PROVIDER", {
            is: JOI.valid("custom", "titan"),
            then: JOI.required(),
            otherwise: JOI.optional()
        }),

}).unknown();


const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
module.exports =  {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    allowedOrigins: envVars.CORS_ORIGINS.split(","),
    smtp:{
        provider: envVars.SMTP_PROVIDER,
        email: envVars.SMTP_EMAIL,
        password: envVars.SMTP_PASSWORD,
        host: envVars.SMTP_HOST,
        port: envVars.SMTP_PORT,
        secure: envVars.SMTP_SECURE === 'true',
    },
    jwtSecret: envVars.JWT_SECRET,
    mongoose:{
        url: envVars.MONGO_URI,
        options: {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        }
    },
    httpCodes: httpStatus.status,
    httpStatus:httpStatus,
    serverConf: require("./server.config"),
}