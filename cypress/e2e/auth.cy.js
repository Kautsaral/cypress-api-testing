import { login } from "../support/api/auth.api";

describe("Skenario Authentication API", () => {
  it("POST - Success Login", () => {
    cy.env(["API_USERNAME", "API_PASSWORD"]).then(
      ({ API_USERNAME, API_PASSWORD }) => {
        login(API_USERNAME, API_PASSWORD).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("token");
        });
      },
    );
  });

  it("POST - Invalid Credentials", () => {
    cy.env(["API_USERNAME", "INVALID_PASSWORD"]).then(
      ({ API_USERNAME, INVALID_PASSWORD }) => {
        login(API_USERNAME, INVALID_PASSWORD).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("reason", "Bad credentials");
          expect(response.body).to.not.have.property("token"); // Pastikan token tidak bocor
        });
      },
    );
  });

  it("POST - Username Empty", () => {
    cy.env(["API_PASSWORD"]).then(({ API_PASSWORD }) => {
      login("", API_PASSWORD).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("reason", "Bad credentials");
        expect(response.body).to.not.have.property("token");
      });
    });
  });
});
