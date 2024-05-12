describe('API Tests', () => {

  it('should get weather data', () => {
    cy.request('GET', 'http://127.0.0.1:8000/weather-data')
      .its('status')
      .should('equal', 200);
  });

  it('should predict soil moisture with valid data', () => {
      cy.request('POST', 'http://127.0.0.1:8000/predict-soil-moisture', {
          air_humidity: 0.0,
          temperature: 0.0,
          pm2_5: 0.0,
          wind_speed: 0.0
      })          
      .its('status')
      .should('equal', 200);
  });

  it('should fail to predict soil moisture with invalid data', () => {
    cy.request({
      method: 'POST',
      url: 'http://127.0.0.1:8000/predict-soil-moisture',
      failOnStatusCode: false,
      body: {
          "air_humidity": 0.0,
          "temperature": 0.0,
          "pm2_5": 0.0
      }
    })
      .its('status')
      .should('equal', 422);
  });

  it('should get histogram visualization with valid feature name', () => {
    cy.request('GET', `http://127.0.0.1:8000/visualize/histogram/soil_moisture`)
      .its('status')
      .should('equal', 200);
  });
  
  it('should get line plot visualization', () => {
    cy.request('GET', 'http://127.0.0.1:8000/visualize/lineplot')
      .its('status')
      .should('equal', 200);
  });

  it('should get heatmap visualization', () => {
    cy.request('GET', 'http://127.0.0.1:8000/visualize/heatmap')
      .its('status')
      .should('equal', 200);
  });

  it('should get statistical data', () => {
    cy.request('GET', 'http://127.0.0.1:8000/statistics')
      .its('status')
      .should('equal', 200);
  });
});
