import React from "react";
import { StoreProvider } from "./Store.provider";
import { ThemeProviderMui } from "./Theme.provider";
import { AuthProvider } from "./Auth.provider";
import FilesProvider from "./Files.provider";
import { BalanceProvider } from "./Balance.provider";
import { WarehouseProvider } from "./Warehouse.provider";
import { WebsocketProvider } from "./Websocket.provider";
import RequestsSortParamsProvider from "./RequestsSortParams.provider";
import { FiltersProvider } from "./Filters.provider";

interface Props {
  children: React.ReactNode;
}

function CombineProviders({ children }: Props) {
  return (
    <StoreProvider>
      <ThemeProviderMui>
        <AuthProvider>
          <FilesProvider>
            <BalanceProvider>
              <WarehouseProvider>
                <WebsocketProvider>
                  <RequestsSortParamsProvider>
                    <FiltersProvider>{children}</FiltersProvider>
                  </RequestsSortParamsProvider>
                </WebsocketProvider>
              </WarehouseProvider>
            </BalanceProvider>
          </FilesProvider>
        </AuthProvider>
      </ThemeProviderMui>
    </StoreProvider>
  );
}

export { CombineProviders };
