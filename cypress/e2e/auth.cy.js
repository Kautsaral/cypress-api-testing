describe('Skenario Authentication API', () => {

  it('POST - Success Login', () => {
    cy.env(['API_USERNAME', 'API_PASSWORD']).then(
    ({ API_USERNAME, API_PASSWORD }) => {
      cy.request({
        method: 'POST',
        url: '/auth',
        body: {
          "username": API_USERNAME,
          "password": API_PASSWORD
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
      });
    });
    });

  it('POST - Invalid Credentials', () => {
    cy.env(['API_USERNAME', 'INVALID_PASSWORD']).then(
    ({ API_USERNAME, INVALID_PASSWORD }) => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body:{
        "username": API_USERNAME,
        "password": INVALID_PASSWORD
      }
    }).then((response) => {
      expect(response.status).to.eq(200); 
      expect(response.body).to.have.property('reason', 'Bad credentials');
      expect(response.body).to.not.have.property('token'); // Pastikan token tidak bocor
    });
    });
  });

  it('POST - Username Empty', () => {
    cy.env(['API_PASSWORD']).then(
    ({ API_PASSWORD }) => {
    cy.request({    
      method: 'POST',
      url: '/auth',
      body: {
        "password": API_PASSWORD
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('reason', 'Bad credentials');
      expect(response.body).to.not.have.property('token');
    });
  });
});

});