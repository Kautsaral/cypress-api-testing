describe('Latihan API test', () => {

  let bookingId; //  ID untuk dipakai di skenario lain
  let authToken; //  token

  it('1. POST - Auth (Mendapatkan Token)', () => {
    cy.env(['API_USERNAME', 'API_PASSWORD']).then(
    ({ API_USERNAME, API_PASSWORD }) => {

    cy.request({
      method: 'POST',
      url:'/auth',
      body: {
        "username": API_USERNAME,
        "password": API_PASSWORD
    }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      authToken = response.body.token; 
    });
  });
  });

  it('2. POST - Create Booking', () => {
    cy.request({
      method: 'POST',
      url: `/booking`,
      body: {
        "firstname": "El",
        "lastname": "Tubruk",
        "totalprice": 250000,
        "depositpaid": true,
        "bookingdates": { // nested JSON (objek di dalam objek)
          "checkin": "2026-09-14",
          "checkout": "2026-09-20"
        },
        "additionalneeds": "Extra bantal"
      }
    }).then((response) => {
      expect(response.status).to.eq(200); 
      expect(response.body).to.have.property('bookingid');
      bookingId = response.body.bookingid; 
      expect(response.body.booking.firstname).to.eq("El");
      expect(response.body.booking.lastname).to.eq("Tubruk");
      expect(response.body.booking.totalprice).to.eq(250000);
      expect(response.body.booking.depositpaid).to.eq(true);
    });
  });

  it('3. GET - Get Detail Booking Berdasarkan ID', () => {
    cy.request({
      method: 'GET',
      url: `/booking/${bookingId}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.lastname).to.eq("Tubruk");
      expect(response.body.totalprice).to.eq(250000);
      expect(response.body.depositpaid).to.eq(true);
    });
  });

  it('4. PUT - Update Booking', () => {
    cy.request({
      method: 'PUT',
      url: `/booking/${bookingId}`,
      headers: {
        'Cookie': `token=${authToken}`, 
        'Accept': 'application/json'
      },
      body: {                      
        "firstname": "Dul",
        "lastname": "Uncle",
        "totalprice": 500000, // Harga diubah
        "depositpaid": false, // Status deposit diubah
        "bookingdates": {
          "checkin": "2026-09-14",
          "checkout": "2026-09-20"
        },
        "additionalneeds": "Extra bantal dan sarapan"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.totalprice).to.eq(500000);
    });
  });
  it('5. DELETE - Delete booking berdasarkan booking ID', () =>{
    cy.request(
      {
        method:'DELETE',
        url:`/booking/${bookingId}`,
        headers: {
        'Cookie': `token=${authToken}`, 
        'Accept': 'application/json'
      }
    }).then((response)=>{
      expect(response.status).to.eq(201);
    })
  })
  it('TEST FAILED - Demo CI Report', () => {
  expect(true).to.eq(false);
});git
});


