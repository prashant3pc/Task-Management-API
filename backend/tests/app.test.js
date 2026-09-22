import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Root route", () => {
  it("should return 200 and server running message", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Server is running");
  });
  it("should reject unauthenticated request", async () => {
    const response = await request(app).get("/api/tasks");

    expect(response.status).toBe(401);
  });

  it("should login user successfully", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "test3@example.com",
      password: "password123",
    });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(typeof response.body.data).toBe("string");
  });
});
