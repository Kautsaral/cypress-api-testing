export const login = (username, password) => {
  return cy.request({
    method: "POST",
    url: "/auth",
    body: {
      username,
      password,
    },
  });
};
