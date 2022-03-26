// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    testEnvironment: "jsdom"
  };
  
  module.exports = config;
  
  // Or async function
  module.exports = async () => {
    return {
      setupFilesAfterEnv: ["./jest.setup.js"],
      verbose: true,
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["./jest.setup.js"],
      moduleNameMapper: {
        "^@components(.*)$": "<rootDir>/components$1",
        "^@pages(.*)$": "<rootDir>/pages$1",
        "^@hooks(.*)$": "<rootDir>/hooks$1",
      },
    };
  };