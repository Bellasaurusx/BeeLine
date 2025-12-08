try { require('dotenv').config(); } catch (e) {}
export default {
  expo: {
    name: "BeeLine",
    slug: "BeeLine",
    extra: { API_URL: process.env.EXPO_PUBLIC_API_URL },
  },
};
