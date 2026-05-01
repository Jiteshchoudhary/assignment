import { createClient } from "redis";

export const RedisClient = createClient({
    url: process.env.REDIS_HOST
});

RedisClient.on("error", (error) => {
    console.log(error);
});

RedisClient.on("connect", () => {
    console.log(`Redis connected successfully`)
});

export const connectRedis = async () => {
    return await RedisClient.connect();
}