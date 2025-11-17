import 'dotenv/config';

export default ({ config }) => ({
    ...config,
    extra: {
        ...config.extra,
        EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
        "PLANTNET_API_KEY": process.env.PLANTNET_API_KEY,
    },
});