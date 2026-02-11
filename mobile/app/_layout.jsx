import { Slot } from "expo-router";
import { PinsProvider } from "./context/PinsContext";
import { LeftHandProvider } from "./context/LeftHandContext";

export default function RootLayout() {
  return (
    <LeftHandProvider>
      <PinsProvider>
        <Slot />
      </PinsProvider>
    </LeftHandProvider>
  );
}

