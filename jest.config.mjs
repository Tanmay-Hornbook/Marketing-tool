export default {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"], // Optional:
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", 
  },
};
