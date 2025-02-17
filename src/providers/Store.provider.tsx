import { setupStore } from "@store/store";
import React from "react";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export function StoreProvider({ children }: Props) {
  const store = setupStore();
  return <Provider store={store}>{children}</Provider>;
}
