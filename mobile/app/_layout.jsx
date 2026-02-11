import { Slot } from "expo-router";
import { PinsProvider } from "./state/PinsContext";

export default function RootLayout() {
  return (
    <PinsProvider>
      <Slot />
    </PinsProvider>
  );
}
