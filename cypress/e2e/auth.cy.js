import { login } from "../support/api/auth.api";
import authData from "../fixtures/auth.json";

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

  describe("Negative Login Scenarios", () => {
    authData.invalidLoginCases.forEach((testCase) => {
      it(`POST - ${testCase.scenario}`, () => {
        cy.env(["API_USERNAME", "API_PASSWORD"]).then(
          ({ API_USERNAME, API_PASSWORD }) => {
            const username =
              testCase.usernameType === "valid"
                ? API_USERNAME
                : testCase.username;

            const password =
              testCase.passwordType === "valid"
                ? API_PASSWORD
                : testCase.password;

            login(username, password).then((response) => {
              expect(response.status).to.eq(200);

              expect(response.body).to.have.property(
                "reason",
                testCase.expectedReason,
              );

              expect(response.body).to.not.have.property("token");
            });
          },
        );
      });
    });
  });
});
