import { createBrowserRouter } from "react-router-dom";

import {
  AUTH_PAGE,
  REQUESTS_PAGE,
  CREATE_REQUEST_PAGE,
  EDIT_REQUEST_SINGLE_PAGE,
  ARCHIVE_PAGE,
  SEARCH_PAGE,
  HISTORY_SINGLE_PAGE,
  PROFILE_PAGE,
  USERS_PAGE,
  USERS_SINGLE_PAGE,
  DIVISIONS_PAGE,
  EDIT_DIVISION_PAGE,
} from "@configs/routes";

import PrivateRoute from "@components/PrivateRoute/PrivateRoute";
import { GettingDivisionsProvider } from "@providers/GettingDivisions.provider";
import { ActionsProvider } from "@providers/Actions.provider";
import { GettingUserRolesProvider } from "@providers/GettingUserRoles.provider";
import GettingUsersProvider from "@providers/GettingUsers.provider";
import MainLayout from "@layouts/MainLayout";
import {
  AuthPage,
  ArchivePage,
  CreateRequestPage,
  DivisionsPage,
  EditRequestPage,
  EditUserPage,
  HistoryPage,
  NotFound,
  ProfilePage,
  RequestsPage,
  SearchPage,
  UsersPage,
  EditDivisionPage,
} from "../pages";
import { PrivateRouteProvider } from "@providers/PrivateRoute.provider";

const router = createBrowserRouter([
  {
    path: AUTH_PAGE,
    element: <AuthPage></AuthPage>,
  },

  {
    element: <PrivateRoute></PrivateRoute>,
    children: [
      {
        element: <MainLayout></MainLayout>,
        children: [
          {
            element: <GettingDivisionsProvider></GettingDivisionsProvider>,
            children: [
              {
                element: <ActionsProvider></ActionsProvider>,
                children: [
                  {
                    path: REQUESTS_PAGE,
                    element: <RequestsPage />,
                  },
                  {
                    path: ARCHIVE_PAGE,
                    element: <ArchivePage />,
                  },
                  {
                    path: SEARCH_PAGE,
                    element: <SearchPage />,
                  },
                  {
                    path: HISTORY_SINGLE_PAGE,
                    element: <HistoryPage />,
                  },
                ],
              },
              {
                element: <GettingUserRolesProvider></GettingUserRolesProvider>,
                children: [
                  {
                    element: <GettingUsersProvider></GettingUsersProvider>,
                    children: [
                      {
                        path: USERS_PAGE,
                        element: <UsersPage />,
                      },
                      {
                        path: USERS_SINGLE_PAGE,
                        element: (
                          <PrivateRouteProvider>
                            <EditUserPage></EditUserPage>
                          </PrivateRouteProvider>
                        ),
                      },
                    ],
                  },
                ],
              },
              {
                path: CREATE_REQUEST_PAGE,
                element: (
                  <PrivateRouteProvider>
                    <CreateRequestPage />
                  </PrivateRouteProvider>
                ),
              },
              {
                path: EDIT_REQUEST_SINGLE_PAGE,
                element: (
                  <PrivateRouteProvider>
                    <EditRequestPage />
                  </PrivateRouteProvider>
                ),
              },
              {
                path: PROFILE_PAGE,
                element: <ProfilePage />,
              },
              {
                path: DIVISIONS_PAGE,
                element: <DivisionsPage></DivisionsPage>,
              },
              {
                path: EDIT_DIVISION_PAGE,
                element: (
                  <PrivateRouteProvider>
                    <EditDivisionPage></EditDivisionPage>
                  </PrivateRouteProvider>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

export { router };
