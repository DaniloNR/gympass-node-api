import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const {
      body: { token },
    } = await request(app.server).post("/session").send({
      email: "johndoe@example.com",
      password: "123456",
    });

    const { statusCode, body } = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(statusCode).toEqual(200);
    expect(body.user).toEqual(
      expect.objectContaining({
        email: "johndoe@example.com",
      })
    );
  });
});
