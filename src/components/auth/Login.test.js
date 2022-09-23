import reducer, {
  initialState,
  login,
} from "../../redux/features/auth/authSlice";
import {store} from "../../redux/store"
const request = require('supertest');


let bearerToken = ''

describe("Login user", () => {


  it("Should render a 401 status error message if the password is wrong", async () => {
    const result = await store.dispatch(login({email: "hugo@yahoo.fr", password:"Wrong-password !!!"}))
    expect(result.type).toBe("auth/login/fulfilled");
    expect(result.payload.status).toBe(401)
  })
  it("Should render a 400 status error message if the account is not recognized", async () => {
    const result = await store.dispatch(login({email: "wrong.account@wrong.wrong", password:"123123"}))
    expect(result.type).toBe("auth/login/fulfilled");
    expect(result.payload.status).toBe(400)
  })
  it("Should render a 200 status message if the account is not recognized", async () => {
    const result = await store.dispatch(login({email: "hugo@yahoo.fr", password:"azeaze"}))
    expect(result.type).toBe("auth/login/fulfilled");
    expect(result.payload.status).toBe(200)
    expect(result.payload.token.length).toBeGreaterThanOrEqual(10)
  })
})