module.exports = {
  ci: {
    collect: { staticDistDir: "./build" },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.98 }],
        "categories:accessibility": ["error", { minScore: 0.8 }],
        "categories:seo": ["warn", { minScore: 0.98 }],
        "categories:best-practices": ["error", { minScore: 0.98 }],
      },
    },
  },
}
