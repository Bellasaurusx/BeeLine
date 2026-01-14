import { Slot } from "expo-router";
import { LeftHandProvider } from "./LeftHandContext";

export default function RootLayout() {
  return (
    <LeftHandProvider>
      <Slot />
    </LeftHandProvider>
  );
}
