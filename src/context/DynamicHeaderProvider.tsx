/* eslint-disable @typescript-eslint/no-empty-function */
// libraries
import React, { createContext, useContext, useReducer, useState } from "react";

// types
interface DefaultValue {
  title?: string;
  setTitle: (title: string) => void;
  toggleRightChevron: () => void;
  rightChevronToggled: boolean;
}

const defaultValue: DefaultValue = {
  title: "",
  setTitle: () => null,
  toggleRightChevron: () => null,
  rightChevronToggled: false,
};

// context
const DynamicHeaderContext = createContext(defaultValue);

export const DynamicHeaderProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // DynamicHeader variable
  const [title, setTitle] = useState("");
  const [rightChevronToggled, toggleRightChevron] = useReducer(
    (prvState) => !prvState,
    false
  );

  // DynamicHeader provider
  return (
    <DynamicHeaderContext.Provider
      value={{
        title,
        setTitle,
        toggleRightChevron,
        rightChevronToggled,
      }}
    >
      {children}
    </DynamicHeaderContext.Provider>
  );
};

export const useDynamicHeader = () => useContext(DynamicHeaderContext);
