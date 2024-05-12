describe('UI Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should navigate to predictor page and accurately predict soil moisture values', () => {

    // Fill in valid values
    cy.get('.input-unit input[name="air_humidity"]').clear().type('75');
    cy.get('.input-unit input[name="pm2_5"]').clear().type('36.6');
    cy.get('.input-unit input[name="temperature"]').clear().type('30');
    cy.get('.input-unit input[name="wind_speed"]').clear().type('3.6');

    // Click on 'Predict' button
    cy.contains('button', 'Predict').click();

    // Assert system accurately predicts soil moisture values
    cy.get('.value-unit .unit').should('have.text', '2095398 ohms (Ω)');
  });

  it('should view current values and display real-time values based on location', () => {
    // Click on current values option
    cy.contains('.link-name', 'Current Values').click();
    // Assert redirect to current values page
    cy.url().should('include', '/currentvalues');
    cy.wait(10000);
    // Assert system displays real-time values based on location
    cy.get('.value-box').should('be.visible');
  });

  it('should explore descriptive statistics and display them for data', () => {
    // Click on descriptive option
    cy.contains('.link-name', 'Descriptive').click();

    // Assert redirect to descriptive page
    cy.url().should('include', '/descriptive');

    // Assert system displays descriptive statistics for data
    cy.get('.descriptive-box').should('be.visible');
  });

  it('should examine histograms and display them for data', () => {
    // Click on histogram option
    cy.contains('.link-name', 'Histogram').click();

    // Assert redirect to histogram page
    cy.url().should('include', '/histogram');

    // Assert system displays histogram of data
    cy.get('.container').should('be.visible');
  });

  it('should view line plots and display them for data', () => {
    // Click on line plot option
    cy.contains('.link-name', 'Line Plot').click();

    // Assert redirect to line plot page
    cy.url().should('include', '/lineplot');

    // Assert system displays line plot of data
    cy.get('.img-container').should('be.visible');
  });

  it('should observe heatmaps and display them for data', () => {
    // Click on heat map option
    cy.contains('.link-name', 'Heat Map').click();

    // Assert redirect to heat map page
    cy.url().should('include', '/heatmap');

    // Assert system shows heat map representation
    cy.get('.heatmap-container').should('be.visible');
  });
});
