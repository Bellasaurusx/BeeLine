import { Redirect } from "expo-router";

export default function Start() {
  // add login stuff later

  const isLoggedIn = false;

  if (isLoggedIn) {
    return <Redirect href="/home" />;
  } else {
    return <Redirect href="/login" />;
  }
}
