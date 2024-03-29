import request from "supertest";
import app, { connectToMongo } from "../../index.js";
import { user } from "../../models/userSchema.js";

//### REGISTRATION TEST ###
describe("Registration API", () => {
  beforeAll(async () => {
    await connectToMongo();
  });

  beforeEach(async () => {
    await user.deleteMany({});
  });

  it("should register a user and return a token", async () => {
    const userInfo = {
      name: "cola",
      dob: "1990-01-01",
      email: "cola@example.com",
      password: "cheese",
    };

    const response = await request(app)
      .post("/api/signup")
      .send(userInfo)
      .expect(201);

    expect(response.body.message).toBe("User created successfully");
    expect(response.body.token).toBeTruthy();

    const createdUser = await user.findOne({ email: userInfo.email }); // Change to userInfo.email
    expect(createdUser).toBeTruthy();
    expect(createdUser.name).toBe(userInfo.name);
    expect(createdUser.email).toBe(userInfo.email);
  });
});
