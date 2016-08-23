// Expects a json object in the format of what comes from the REST API
// Returns datum format for NVD3
export const holdingsToSecurities = (holdings) => {
  const securities = holdings.reduce((reduced, holding, index) => {
    reduced[holding.security] = reduced[holding.security] || [];
    reduced[holding.security].push(holding);
    return reduced;
  }, {});

  return Object
    .keys(securities)
    .map(security => ({
      values: securities[security],
      key: security,
    }));
};
