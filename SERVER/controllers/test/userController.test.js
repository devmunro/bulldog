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
      name: "John Doe",
      dob: "1990-01-01",
      email: "johndoe@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/signup")
      .send(userInfo)
      .expect(201);

      console.log(response.body); // add this line to log the response body

    expect(response.body.message).toBe("User created successfully");
    expect(response.body.token).toBeTruthy();

    const createdUser = await user.findOne({ email: userInfo.email }); // Change to userInfo.email
    expect(createdUser).toBeTruthy();
    expect(createdUser.name).toBe(userInfo.name);
    expect(createdUser.email).toBe(userInfo.email);
  });
});
