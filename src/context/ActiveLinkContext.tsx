'use client';
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  FC,
  Dispatch,
  SetStateAction,
} from 'react';

// Define the shape of the context data
interface SelectedLinkContextType {
  selectedLink: string;
  setSelectedLink: Dispatch<SetStateAction<string>>;
}

// Create the context with default values
const SelectedLinkContext = createContext<SelectedLinkContextType>({
  selectedLink: '',
  setSelectedLink: () => {},
});

// Define props for the Provider component
interface SelectedLinkProviderProps {
  children: ReactNode;
}

// Create the Provider component
const SelectedLinkProvider: FC<SelectedLinkProviderProps> = ({ children }) => {
  const [selectedLink, setSelectedLink] = useState<string>('home');

  return (
    <SelectedLinkContext.Provider value={{ selectedLink, setSelectedLink }}>
      {children}
    </SelectedLinkContext.Provider>
  );
};

// Custom hook for using the context
const useSelectedLink = () => {
  const context = useContext(SelectedLinkContext);
  if (!context) {
    throw new Error(
      'useSelectedLink must be used within a SelectedLinkProvider',
    );
  }
  return context;
};

export { SelectedLinkProvider, useSelectedLink };
