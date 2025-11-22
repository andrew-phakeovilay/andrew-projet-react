import { createContext, useContext } from "react";
import { useFetch } from "../customhooks/useFetch";
import type { Store } from "../interfaces/Store";

interface StoreContextType {
  stores: Store[] | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const stores = useFetch<Store[]>("https://www.cheapshark.com/api/1.0/stores");

  return (
    <StoreContext.Provider value={{ stores }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if(!context){
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context
};
