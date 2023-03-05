// noinspection JSUnresolvedFunction

const PROD = 'production'
const DEFAULT_CLIENT = 'postgres'


module.exports = ({env}) => {

    return {
        connection: {
            client: env('DATABASE_CLIENT', DEFAULT_CLIENT),
            connection: {
                host: env('NODE_ENV') === PROD
                    ? env('DATABASE_HOST')
                    : 'localhost',
                port: env.int('DATABASE_PORT', 5432),
                database: env('DATABASE_NAME', 'hqDb'),
                user: env('DATABASE_USER', 'hq'),
                password: env('DATABASE_PASSWORD', 'uvtwGFhMqchafGsr'),
                ssl: env.bool('DATABASE_SSL', false),
                acquireConnectionTimeout: 5000,
                pool: {
                    min: 0,
                    max: 10,
                    createTimeoutMillis: 8000,
                    acquireTimeoutMillis: 8000,
                    idleTimeoutMillis: 8000,
                    reapIntervalMillis: 1000,
                    createRetryIntervalMillis: 100
                }
            }
        }
    }
}
