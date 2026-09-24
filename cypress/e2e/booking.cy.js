import {
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
  updateBookingWithoutAuth,
  deleteBookingWithoutAuth,
} from "../support/api/booking.api";
import { getValidAuthToken } from "../support/helpers/auth.helper";

describe("Skenario Booking API", () => {
  let bookingId; //  ID untuk dipakai di skenario lain
  let authToken; //  token
  let bookingData; //  data booking

  before(() => {
    cy.fixture("booking").then((data) => {
      bookingData = data;
    });
    getValidAuthToken().then((token) => {
      authToken = token;
    });
  });

  describe("POST  Booking", () => {
    it("POST - Create Booking", () => {
      createBooking(bookingData.createBooking).then((response) => {
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
        expect(response.body.booking.bookingdates.checkin).to.eq(
          bookingData.createBooking.bookingdates.checkin,
        );
        expect(response.body.booking.bookingdates.checkout).to.eq(
          bookingData.createBooking.bookingdates.checkout,
        );
        expect(response.body.booking.additionalneeds).to.eq(
          bookingData.createBooking.additionalneeds,
        );
        expect(response.body.bookingid).to.be.a("number");
        expect(response.body.booking.firstname).to.be.a("string");
        expect(response.body.booking.lastname).to.be.a("string");
        expect(response.body.booking.totalprice).to.be.a("number");
        expect(response.body.booking.depositpaid).to.be.a("boolean");
        expect(response.body.booking.bookingdates).to.be.an("object");
        expect(response.body.booking.bookingdates.checkin).to.be.a("string");
        expect(response.body.booking.bookingdates.checkout).to.be.a("string");
        expect(response.body.booking.additionalneeds).to.be.a("string");
      });
    });
  });

  describe("Existing Booking Operations", () => {
    beforeEach(() => {
      createBooking(bookingData.createBooking).then((response) => {
        expect(response.status).to.eq(200);
        bookingId = response.body.bookingid;
      });
    });

    it("GET - Get Detail Booking Berdasarkan ID", () => {
      getBooking(bookingId).then((response) => {
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
      updateBooking(bookingId, authToken, bookingData.updateBooking).then(
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
      deleteBooking(bookingId, authToken).then((response) => {
        expect(response.status).to.eq(201);
      });
      getBooking(bookingId, false).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  describe("Negative Scenario", () => {
    describe("Booking notfound", () => {
      it("GET - Booking ID notfound", () => {
        getBooking(999999, false).then((response) => {
          expect(response.status).to.eq(404);
        });
      });
    });
    describe("Unathorized Booking", () => {
      let negativeBookingId; //  ID untuk dipakai di skenario lain

      beforeEach(() => {
        createBooking(bookingData.createBooking).then((response) => {
          expect(response.status).to.eq(200);
          negativeBookingId = response.body.bookingid;
        });
      });
      it("PUT - Update Booking tanpa Authentication", () => {
        updateBookingWithoutAuth(
          negativeBookingId,
          bookingData.updateBooking,
        ).then((response) => {
          expect(response.status).to.eq(403);
          expect(response.body).to.eq("Forbidden");
        });
      });
      it("DELETE - Delete Booking tanpa Authentication", () => {
        deleteBookingWithoutAuth(negativeBookingId).then((response) => {
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

        createBooking(invalidBookingData, false).then((response) => {
          expect(response.status).to.eq(500);
          expect(response.body).to.eq("Internal Server Error");
        });
      });
    });
  });
});
