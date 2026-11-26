describe('TC-S01 – Parcours étudiant', () => {
  it('se connecte puis réserve un rendez-vous', () => {
    // 1. Connexion
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type('student@enicar.tn');
    cy.get('input[name="password"]').type('Student@123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/student');
    cy.screenshot('TC-S01-1-tableau-de-bord');

    // 2. Ouvrir le formulaire de rendez-vous
    cy.visit('/student/appointments');
    cy.contains('button', 'Nouveau rendez-vous').click();

    // 3. Choisir le premier créneau disponible et saisir le motif
    cy.get('select.select-field').eq(2).find('option').should('have.length.greaterThan', 1);
    cy.get('select.select-field').eq(2).select(1);
    cy.get('textarea.textarea-field').type('Stress lié aux examens');
    cy.screenshot('TC-S01-2-formulaire-rempli');

    // 4. Confirmer et vérifier
    cy.contains('button', 'Confirmer la réservation').click();
    cy.contains(/En attente|PENDING/i).should('be.visible');
    cy.screenshot('TC-S01-3-resultat');
  });
});