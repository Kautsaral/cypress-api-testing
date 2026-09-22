// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("createBooking", (bookingData) => {
  return cy.request({
    method: "POST",
    url: "/booking",
    body: bookingData,
  });
});

Cypress.Commands.add("getBooking", (bookingId, failOnStatusCode = true) => {
  return cy.request({
    method: "GET",
    url: `/booking/${bookingId}`,
    failOnStatusCode: failOnStatusCode,
  });
});

Cypress.Commands.add("updateBooking", (bookingId, authToken, bookingData) => {
  return cy.request({
    method: "PUT",
    url: `/booking/${bookingId}`,
    headers: {
      Cookie: `token=${authToken}`,
      Accept: "application/json",
    },
    body: bookingData,
  });
});

Cypress.Commands.add("deleteBooking", (bookingId, authToken) => {
  return cy.request({
    method: "DELETE",
    url: `/booking/${bookingId}`,
    headers: {
      Cookie: `token=${authToken}`,
      Accept: "application/json",
    },
  });
});
Cypress.Commands.add("getAuthToken", () => {
  return cy
    .env(["API_USERNAME", "API_PASSWORD"])
    .then(({ API_USERNAME, API_PASSWORD }) => {
      return cy
        .request({
          method: "POST",
          url: "/auth",
          body: {
            username: API_USERNAME,
            password: API_PASSWORD,
          },
        })
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("token");

          return response.body.token;
        });
    });
});
Cypress.Commands.add("updateBookingWithoutAuth", (bookingId, bookingData) => {
  return cy.request({
    method: "PUT",
    url: `/booking/${bookingId}`,
    failOnStatusCode: false,
    body: bookingData,
  });
});

Cypress.Commands.add("deleteBookingWithoutAuth", (bookingId) => {
  return cy.request({
    method: "DELETE",
    url: `/booking/${bookingId}`,
    failOnStatusCode: false,
  });
});
