module.exports = {
  preset: "react-app",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!axios)/"],
  moduleFileExtensions: ["js", "ts", "tsx"],
};
