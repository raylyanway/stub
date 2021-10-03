/// <reference types="cypress" />

context.skip("Local Storage", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/commands/local-storage");
  });
  // Although local storage is automatically cleared
  // in between tests to maintain a clean state
  // sometimes we need to clear the local storage manually

  it("cy.clearLocalStorage() - clear all data in local storage", () => {
    // https://on.cypress.io/clearlocalstorage
    cy.get(".ls-btn")
      .click()
      .should(() => {
        expect(localStorage.getItem("prop1")).eq("red");
        expect(localStorage.getItem("prop2")).eq("blue");
        expect(localStorage.getItem("prop3")).eq("magenta");
      });

    // clearLocalStorage() yields the localStorage object
    cy.clearLocalStorage().should((ls) => {
      expect(ls.getItem("prop1")).eq(null);
      expect(ls.getItem("prop2")).eq(null);
      expect(ls.getItem("prop3")).eq(null);
    });

    cy.get(".ls-btn")
      .click()
      .should(() => {
        expect(localStorage.getItem("prop1")).eq("red");
        expect(localStorage.getItem("prop2")).eq("blue");
        expect(localStorage.getItem("prop3")).eq("magenta");
      });

    // Clear key matching string in Local Storage
    cy.clearLocalStorage("prop1").should((ls) => {
      expect(ls.getItem("prop1")).eq(null);
      expect(ls.getItem("prop2")).eq("blue");
      expect(ls.getItem("prop3")).eq("magenta");
    });

    cy.get(".ls-btn")
      .click()
      .should(() => {
        expect(localStorage.getItem("prop1")).eq("red");
        expect(localStorage.getItem("prop2")).eq("blue");
        expect(localStorage.getItem("prop3")).eq("magenta");
      });

    // Clear keys matching regex in Local Storage
    cy.clearLocalStorage(/prop1|2/).should((ls) => {
      expect(ls.getItem("prop1")).eq(null);
      expect(ls.getItem("prop2")).eq(null);
      expect(ls.getItem("prop3")).eq("magenta");
    });
  });
});
