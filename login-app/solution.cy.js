describe('Login Form Tests', () => {
	beforeEach(() => {
	  // Visit the login page before each test
	  cy.visit('/');
	});
  
	it('should render the login form correctly', () => {
	  // Check for form elements
	  cy.get('h2').should('contain', 'Login Form');
	  cy.get('label[for="username"]').should('contain', 'Username:');
	  cy.get('label[for="password"]').should('contain', 'Password:');
	  cy.get('#username').should('exist');
	  cy.get('#password').should('exist');
	  cy.get('input[type="submit"]').should('have.value', 'Login');
	});
  
	it('should display errors when submitting empty form', () => {
	  cy.get('input[type="submit"]').click();
  
	  cy.get('#usernameError').should('contain', 'Username is required.');
	  cy.get('#passwordError').should('contain', 'Password is required.');
	});
  
	it('should validate username length', () => {
	  cy.get('#username').type('ab');
	  cy.get('#password').type('password123');
	  cy.get('input[type="submit"]').click();
  
	  cy.get('#usernameError').should(
		'contain',
		'Username must be at least 3 characters.'
	  );

	  cy.get('#passwordError').should('not.exist');
	});
  
	it('should validate password length', () => {
	  cy.get('#username').type('username');
	  cy.get('#password').type('12345');
	  cy.get('input[type="submit"]').click();
  
	  cy.get('#passwordError').should(
		'contain',
		'Password must be at least 6 characters.'
	  );
	  cy.get('#usernameError').should('not.exist');
	});
  
	it('should trim whitespace in username and treat it as empty', () => {
	  cy.get('#username').type('   ');
	  cy.get('#password').type('password123');
	  cy.get('input[type="submit"]').click();
  
	  cy.get('#usernameError').should('contain', 'Username is required.');
	  cy.get('#passwordError').should('not.exist');
	});
  
	it('should clear error messages after correcting inputs', () => {
	  // Trigger validation errors
	  cy.get('input[type="submit"]').click();
  
	  cy.get('#usernameError').should('exist');
	  cy.get('#passwordError').should('exist');
  
	  // Correct the inputs
	  cy.get('#username').type('validUser');
	  cy.get('#password').type('validPassword');
	  cy.get('input[type="submit"]').click();
  
	  // Errors should be cleared
	  cy.get('#usernameError').should('not.exist');
	  cy.get('#passwordError').should('not.exist');
  
	  // Check for success alert
	  cy.on('window:alert', (txt) => {
		expect(txt).to.contains('Form submitted successfully!');
	  });
	});
  
	it('should not submit the form when validations fail', () => {
	  // Spy on the form submission
	  cy.get('#loginForm').then(($form) => {
		cy.spy($form[0], 'submit').as('formSubmit');
	  });
  
	  // Trigger validation errors
	  cy.get('input[type="submit"]').click();
  
	  // Ensure form was not submitted
	  cy.get('@formSubmit').should('not.have.been.called');
	});
  
	it('should submit the form successfully with valid inputs', () => {
	  cy.get('#username').type('validUser');
	  cy.get('#password').type('validPassword123');
	  cy.get('input[type="submit"]').click();
  
	  // Errors should not exist
	  cy.get('#usernameError').should('not.exist');
	  cy.get('#passwordError').should('not.exist');
  
	  // Check for success alert
	  cy.on('window:alert', (txt) => {
		expect(txt).to.contains('Form submitted successfully!');
	  });
	});
  });
  