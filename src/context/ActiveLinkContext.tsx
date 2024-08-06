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

interface SelectedLinkContextType {
  selectedLink: string;
  setSelectedLink: Dispatch<SetStateAction<string>>;
}

const SelectedLinkContext = createContext<SelectedLinkContextType>({
  selectedLink: '',
  setSelectedLink: () => {},
});

interface SelectedLinkProviderProps {
  children: ReactNode;
}

const SelectedLinkProvider: FC<SelectedLinkProviderProps> = ({ children }) => {
  const [selectedLink, setSelectedLink] = useState<string>('home');

  return (
    <SelectedLinkContext.Provider value={{ selectedLink, setSelectedLink }}>
      {children}
    </SelectedLinkContext.Provider>
  );
};

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
