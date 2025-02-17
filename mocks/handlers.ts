import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://jsonplaceholder.typicode.com/users/1", async () => {
    await delay(150);
    return HttpResponse.json({
      name: "John Smith",
      email: "johsmith@wp.pl",
      id: 1,
      created_at: new Date("2023-11-20T12:34:56"),
      updated_at: new Date("2023-11-20T12:34:56"),
    });
  }),
];
