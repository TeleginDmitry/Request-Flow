import "@testing-library/jest-dom";
import { server } from "./mocks/server";

// Запуск сервера перед тестами
beforeAll(() => server.listen());
// Очистка обработчиков после каждого теста
afterEach(() => server.resetHandlers());
// Отключение сервера после завершения всех тестов
afterAll(() => server.close());
