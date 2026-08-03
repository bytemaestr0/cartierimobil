import { useDeals } from "../hooks/useDeals";
import { DealsContext } from "./DealsContext";

export function DealsProvider({ children }) {
  const value = useDeals();
  return <DealsContext.Provider value={value}>{children}</DealsContext.Provider>;
}
