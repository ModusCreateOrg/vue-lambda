process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

module.exports = {
  moduleFileExtensions: ["js", "json", "vue"],
  moduleNameMapper: {
    "\\.(ico|jpeg|jpg|png)$": "<rootDir>/src/test/mock/$1.mock.js",
  },
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest",
  },
};
