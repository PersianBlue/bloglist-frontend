describe("Blog app", function () {
  let user;
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Username").type(user.username);
      cy.contains("Password").type(user.password);
      cy.contains("Login").click();
      cy.contains(`${user.name} is logged in`);
    });

    it("fails with wrong credentials", function () {
      // ...
    });
  });
});
