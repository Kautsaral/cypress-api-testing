import { login } from "../api/auth.api";

export const getValidAuthToken = () => {
  return cy
    .env(["API_USERNAME", "API_PASSWORD"])
    .then(({ API_USERNAME, API_PASSWORD }) => {
      return login(API_USERNAME, API_PASSWORD).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");

        return response.body.token;
      });
    });
};
