describe("Skenario Booking API", () => {
  let bookingId; //  ID untuk dipakai di skenario lain
  let authToken; //  token
  let bookingData; //  data booking

  before(() => {
    cy.fixture("booking").then((data) => {
      bookingData = data;
    });
    cy.getAuthToken().then((token) => {
      authToken = token;
    });
  });

  describe("POST  Booking", () => {
    it("POST - Create Booking", () => {
      cy.createBooking(bookingData.createBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("bookingid");
        bookingId = response.body.bookingid;
        expect(response.body.booking.firstname).to.eq(
          bookingData.createBooking.firstname,
        );
        expect(response.body.booking.lastname).to.eq(
          bookingData.createBooking.lastname,
        );
        expect(response.body.booking.totalprice).to.eq(
          bookingData.createBooking.totalprice,
        );
        expect(response.body.booking.depositpaid).to.eq(
          bookingData.createBooking.depositpaid,
        );
      });
    });
  });

  describe("Existing Booking Operations", () => {
    beforeEach(() => {
      cy.createBooking(bookingData.createBooking).then((response) => {
        expect(response.status).to.eq(200);
        bookingId = response.body.bookingid;
      });
    });

    it("GET - Get Detail Booking Berdasarkan ID", () => {
      cy.getBooking(bookingId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.lastname).to.eq(
          bookingData.createBooking.lastname,
        );
        expect(response.body.firstname).to.eq(
          bookingData.createBooking.firstname,
        );
        expect(response.body.totalprice).to.eq(
          bookingData.createBooking.totalprice,
        );
        expect(response.body.depositpaid).to.eq(
          bookingData.createBooking.depositpaid,
        );
      });
    });

    it("PUT - Update Booking", () => {
      cy.updateBooking(bookingId, authToken, bookingData.updateBooking).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body.firstname).to.eq(
            bookingData.updateBooking.firstname,
          );
          expect(response.body.lastname).to.eq(
            bookingData.updateBooking.lastname,
          );
          expect(response.body.totalprice).to.eq(
            bookingData.updateBooking.totalprice,
          );
          expect(response.body.depositpaid).to.eq(
            bookingData.updateBooking.depositpaid,
          );
        },
      );
    });
    it("DELETE - Delete booking berdasarkan booking ID", () => {
      cy.deleteBooking(bookingId, authToken).then((response) => {
        expect(response.status).to.eq(201);
      });
      cy.getBooking(bookingId, false).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  describe("Negative Scenario", () => {
    describe("Booking notfound", () => {
      it("GET - Booking ID notfound", () => {
        cy.getBooking(999999, false).then((response) => {
          expect(response.status).to.eq(404);
        });
      });
    });
    describe("Unathorized Booking", () => {
      let negativeBookingId; //  ID untuk dipakai di skenario lain

      beforeEach(() => {
        cy.createBooking(bookingData.createBooking).then((response) => {
          expect(response.status).to.eq(200);
          negativeBookingId = response.body.bookingid;
        });
      });
      it("PUT - Update Booking tanpa Authentication", () => {
        cy.updateBookingWithoutAuth(
          negativeBookingId,
          bookingData.updateBooking,
        ).then((response) => {
          expect(response.status).to.eq(403);
          expect(response.body).to.eq("Forbidden");
        });
      });
      it("DELETE - Delete Booking tanpa Authentication", () => {
        cy.deleteBookingWithoutAuth(negativeBookingId).then((response) => {
          expect(response.status).to.eq(403);
          expect(response.body).to.eq("Forbidden");
        });
      });
    });

    describe("Invalid Booking Payload", () => {
      it("POST - Create Booking tanpa firstname", () => {
        const invalidBookingData = {
          ...bookingData.createBooking,
        };

        delete invalidBookingData.firstname;

        cy.request({
          method: "POST",
          url: "/booking",
          body: invalidBookingData,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(500);
          expect(response.body).to.eq("Internal Server Error");
        });
      });
    });
  });
});
