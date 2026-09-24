export const createBooking = (bookingData, failOnStatusCode = true) => {
  return cy.request({
    method: "POST",
    url: "/booking",
    body: bookingData,
    failOnStatusCode,
  });
};

export const getBooking = (bookingId, failOnStatusCode = true) => {
  return cy.request({
    method: "GET",
    url: `/booking/${bookingId}`,
    failOnStatusCode,
  });
};

export const updateBooking = (bookingId, authToken, bookingData) => {
  return cy.request({
    method: "PUT",
    url: `/booking/${bookingId}`,
    headers: {
      Cookie: `token=${authToken}`,
      Accept: "application/json",
    },
    body: bookingData,
  });
};

export const deleteBooking = (bookingId, authToken) => {
  return cy.request({
    method: "DELETE",
    url: `/booking/${bookingId}`,
    headers: {
      Cookie: `token=${authToken}`,
      Accept: "application/json",
    },
  });
};
export const updateBookingWithoutAuth = (bookingId, bookingData) => {
  return cy.request({
    method: "PUT",
    url: `/booking/${bookingId}`,
    body: bookingData,
    failOnStatusCode: false,
  });
};

export const deleteBookingWithoutAuth = (bookingId) => {
  return cy.request({
    method: "DELETE",
    url: `/booking/${bookingId}`,
    failOnStatusCode: false,
  });
};
