import { screen } from "@testing-library/react";
import UserDetails from "./UserDetails";
import { renderWithProviders } from "@utils/reduxTest";
import { server } from "@mocks/server";
import { delay, http, HttpResponse } from "msw";

describe("UserDetails", () => {
  it("renders loading state initially", () => {
    renderWithProviders(<UserDetails />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders user details when data is successfully fetched", async () => {
    renderWithProviders(<UserDetails />);

    await screen.findByTestId("user");
    expect(screen.getByText(/Name: John Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Email: johsmith@wp.pl/i)).toBeInTheDocument();
  });

  it("renders error message when data fetching fails", async () => {
    server.use(
      http.get("https://jsonplaceholder.typicode.com/users/1", async () => {
        await delay(150);
        return HttpResponse.json(
          {
            message: "Failed to fetch user",
          },
          { status: 400 }
        );
      })
    );

    renderWithProviders(<UserDetails />);

    await screen.findByText(/Error: Failed to fetch user/i);
  });

  it("renders no user data message when user is null", async () => {
    server.use(
      http.get("https://jsonplaceholder.typicode.com/users/1", async () => {
        await delay(150);
        return HttpResponse.json(null, { status: 200 });
      })
    );

    renderWithProviders(<UserDetails />);

    await screen.findByText(/No user data available/i);
  });
});
