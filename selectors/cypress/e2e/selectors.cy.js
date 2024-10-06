describe('Cypress Selectors Practice', () => {

  beforeEach(() => {
      cy.visit('http://localhost:8080');
  });

  it('Selects elements by tag name', () => {
      // Selects all <p> elements
      cy.get('p').should('have.length', 6);
  });

  it('Selects element by ID', () => {
      // Selects the button with id "submit-button"
      cy.get('#submit-button').should('contain', 'Submit');
  });

  it('Selects elements by class', () => {
      // Selects all elements with class "button"
      cy.get('.button').should('have.length', 2);
  });

  it('Selects elements by attribute', () => {
      // Selects input elements of type "email"
      cy.get('input[type="email"]').should('exist');
  });

  it('Selects elements by data attribute', () => {
      // Selects the div with data-cy="custom-element"
      cy.get('[data-cy="custom-element"]').should('contain', 'Data attribute selector example.');
  });

  it('Selects nested elements', () => {
      // Selects all <li> elements inside a <ul>
      cy.get('ul li').should('have.length', 3);
  });

  it('Selects child elements', () => {
      // Selects direct child <span> of element with class "inner-container"
      cy.get('.inner-container > span').should('contain', 'Inner Content');
  });

  it('Selects sibling elements', () => {
      // Selects the next sibling of the first .card
      cy.get('.card').first().next().should('contain', 'Another Card Title');
  });

  it('Uses pseudo-classes', () => {
      // Selects the first list item
      cy.get('li:first-child').should('contain', 'List Item 1');

      // Selects the active list item
      cy.get('li.active').should('contain', 'List Item 2');

      // Selects the last card
      cy.get('.card:last h2').should('contain', 'Another Card Title');
  });

  it('Selects elements using .find()', () => {
    // Finds <a> elements inside .inner-container
    cy.get('.inner-container').find('a').should('have.class', 'link');
  });

  it('Checks for hidden elements', () => {
    // Asserts that the hidden element is not visible
    cy.get('#hidden-element').should('not.be.visible');
  });

  it('Selects elements with multiple classes', () => {
    // Selects button with both "button" and "primary" classes
    cy.get('.button.primary').should('have.id', 'submit-button');
  });

  // Advanced section
  it('Interacts with form elements', () => {
      // Fills out the login form
      cy.get('[data-test="username-input"]').type('testuser');
      cy.get('[data-test="password-input"]').type('password123');
      cy.get('#remember-me').check();
      cy.get('[data-test="login-button"]').click();
  });

  it('Uses .within() to scope selectors', () => {
      // Scopes to the login form
      cy.get('#login-form').within(() => {
          cy.get('input[name="username"]').type('scopeduser');
          cy.get('input[name="password"]').type('scopedpassword');
      });
  });

  it('Uses aliasing for reusing selectors', () => {
      // Aliases the submit button
      cy.get('#submit-button').as('submitButton');
      cy.get('@submitButton').should('contain', 'Submit');
  });

  it('Selects elements based on their position', () => {
      // Selects the second <li> element
      cy.get('li').eq(1).should('contain', 'List Item 2');
  });

  it('Filters elements', () => {
      // Filters visible buttons
      cy.get('button').filter(':visible').should('have.length', 3);
  });
});
