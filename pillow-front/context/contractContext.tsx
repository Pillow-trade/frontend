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
import { abi } from "../abi/abi.json";
import { createPublicClient, http, PublicClient } from "viem";

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
  publicClient: PublicClient | null;
  walletClient: WalletClient | null;
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

export const getTotalAssets = async (publicClient: PublicClient) => {
  const data = await publicClient.readContract({
    address: "0x77cac89DB6AEF2d28507b21153cE6268f6138Af8",
    abi: abi,
    functionName: "totalAssets",
  });
  return data;
};

export const ContractProvider: React.FC<ContractProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(contractReducer, initialState);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);

  const { wallets } = useWallets();
  const wallet = wallets[0]; // Replace this with your desired wallet
  console.log("WALLET context:", wallet);

  // Switch chain when wallet is available
  React.useEffect(() => {
    const init = async () => {
      if (wallet) {
        wallet.switchChain(sepolia.id);
        initWalletClient();
        initPublicClient();
      }
    };
    init();
  }, [wallet]);

  const initPublicClient = async () => {
    console.log("INIT PUBLIC CLIENT");
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http(),
    });
    console.log("PUBLIC CLIENT:", publicClient);
    setPublicClient(publicClient);
  };

  const initWalletClient = async () => {
    const provider = await wallet.getEthereumProvider();
    console.log("PROVIDER:", provider);
    const walletClient = createWalletClient({
      account: wallet.address as Hex,
      chain: sepolia,
      transport: custom(provider),
    });
    console.log("WALLET CLIENT:", walletClient);
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
    publicClient,
    walletClient,
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
