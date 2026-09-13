import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST /api/v1/users", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("With unique  and valid data", async () => {
        const response = await fetch("http://localhost:3000/api/v1/users", {
          method: "POST",
        });
        expect(response.status).toBe(201);
      });
    });
  });
});
