module.exports = {
    "roots": [
        "<rootDir>/src",
        "<rootDir>"
    ],
    "testMatch": [
        "**/test/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "testPathIgnorePatterns": [
      "/node_modules/",
      "/test/data/"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
}
