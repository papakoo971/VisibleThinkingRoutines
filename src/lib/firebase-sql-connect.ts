import { connectDataConnectEmulator, getDataConnect } from "firebase/data-connect";
import { connectorConfig } from "@/lib/dataconnect-generated";
import { getFirebaseClientApp } from "@/lib/firebase-client";

let emulatorConnected = false;

export function getVisibleThinkingDataConnect() {
  getFirebaseClientApp();

  const dataConnect = getDataConnect(connectorConfig);
  const useEmulator = process.env.NEXT_PUBLIC_FIREBASE_DATACONNECT_EMULATOR === "true";

  if (useEmulator && !emulatorConnected) {
    connectDataConnectEmulator(
      dataConnect,
      process.env.NEXT_PUBLIC_FIREBASE_DATACONNECT_EMULATOR_HOST ?? "localhost",
      Number(process.env.NEXT_PUBLIC_FIREBASE_DATACONNECT_EMULATOR_PORT ?? "9399")
    );
    emulatorConnected = true;
  }

  return dataConnect;
}
