import { createContext, useContext } from "react";

export const DealsContext = createContext(null);

export function useDealsContext() {
  const ctx = useContext(DealsContext);
  if (!ctx) {
    throw new Error("useDealsContext must be used within DealsContext.Provider");
  }
  return ctx;
}
