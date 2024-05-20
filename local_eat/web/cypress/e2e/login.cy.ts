describe('Testing signup', () => {
  beforeEach(() => {
    cy.request('GET', 'http://localhost:8080/ping')
    cy.visit('/signup')
    cy.get('#first_name').clear();
    cy.get('#first_name').type('test');
    cy.get('#email').clear();
    cy.get('#email').type('mail@example.com');
    cy.get('#password').clear();
    cy.get('#password').type('test1234');
    cy.get('.btn').click();

  })

  it('Should display an invalid message when password is too short', () => {
    cy.visit('/login')
    cy.get('#first_name').clear('t');
    cy.get('#first_name').type('toto');
    cy.get('#password').clear('a');
    cy.get('#password').type('assd');
    cy.get('.container > :nth-child(1)').click();
    cy.get('.form-error > div').should('have.text', 'Le mot de passe doit être de 8 charactères minimum');
  });

  it('Should display an invalid message when email/username is not present', () => {
    cy.visit('/login')
    cy.get('#first_name').click();
    cy.get('app-login').click();
    cy.get('.form-error > div').should('have.text', 'Nom d\'utilisateur requis');
  });

  it('Should display an invalid message when password is not present', () => {
    cy.visit('/login')
    cy.get('#first_name').clear('t');
    cy.get('#first_name').type('toto');
    cy.get('#password').click();
    cy.get('.container > :nth-child(1)').click();
    cy.get('.form-error > div').should('have.text', 'Mot de passe requis');
  });

  it('Should display an invalid message when email/username and password are not present', () => {
    cy.visit('/login')
    cy.get('#first_name').click();
    cy.get('.container > :nth-child(1)').click();
    cy.get('#first_name_error > div').should('have.text', 'Nom d\'utilisateur requis');
    cy.get('#password').click();
    cy.get('.container > :nth-child(1)').click();
    cy.get('#password_error > div').should('have.text', 'Mot de passe requis');
  });

  it('Should fill the form with username and submit', () => {
    cy.visit('/login')
    cy.get('#first_name').clear('t');
    cy.get('#first_name').type('test');
    cy.get('#password').clear('t');
    cy.get('#password').type('test1234');
    cy.get('.btn').click();
    cy.location('pathname').should('eq', '/home')
  })

  it('Should fill the form with email and submit', () => {
    cy.visit('/login')
    cy.get('#first_name').clear('t');
    cy.get('#first_name').type('mail@example.com');
    cy.get('#password').clear('t');
    cy.get('#password').type('test1234');
    cy.get('.btn').click();
    cy.location('pathname').should('eq', '/home')
  })
})