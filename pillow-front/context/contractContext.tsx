"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { createWalletClient, custom, Hex, WalletClient } from "viem";
// Replace `sepolia` with your desired network
import { sepolia } from "viem/chains";
import { useWallets } from "@privy-io/react-auth";

// Define the shape of your context state
interface ContractState {
  isLoading: boolean;
  error: string | null;
  data: any | null;
}

// Define action types for the reducer
type ContractAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_DATA"; payload: any }
  | { type: "RESET" };

// Define the context interface
interface ContractContextType {
  state: ContractState;
  dispatch: React.Dispatch<ContractAction>;
  // Add your custom methods here
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setData: (data: any) => void;
  reset: () => void;
}

// Initial state
const initialState: ContractState = {
  isLoading: false,
  error: null,
  data: null,
};

// Reducer function
const contractReducer = (
  state: ContractState,
  action: ContractAction
): ContractState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_DATA":
      return { ...state, data: action.payload, error: null };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

// Create the context
const ContractContext = createContext<ContractContextType | undefined>(
  undefined
);

// Provider component
interface ContractProviderProps {
  children: ReactNode;
}

export const ContractProvider: React.FC<ContractProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(contractReducer, initialState);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);

  const { wallets } = useWallets();
  const wallet = wallets[0]; // Replace this with your desired wallet

  // Switch chain when wallet is available
  React.useEffect(() => {
    if (wallet) {
      wallet.switchChain(sepolia.id);
      initWalletClient();
    }
  }, [wallet]);

  const initWalletClient = async () => {
    const provider = await wallet.getEthereumProvider();
    const walletClient = createWalletClient({
      account: wallet.address as Hex,
      chain: sepolia,
      transport: custom(provider),
    });
    setWalletClient(walletClient);
  };

  // Custom methods
  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const setData = (data: any) => {
    dispatch({ type: "SET_DATA", payload: data });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const contextValue: ContractContextType = {
    state,
    dispatch,
    setLoading,
    setError,
    setData,
    reset,
  };

  return (
    <ContractContext.Provider value={contextValue}>
      {children}
    </ContractContext.Provider>
  );
};

// Custom hook to use the context
export const useContract = (): ContractContextType => {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
};

// Export the context for advanced use cases
export { ContractContext };
