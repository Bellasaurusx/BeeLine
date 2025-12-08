// app/index.jsx
import { Redirect } from "expo-router";

export default function Index() {
  const isLoggedIn = false;  

  if (isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/login" />;
}
