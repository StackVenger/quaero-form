module.exports = {
  // Custom parser options to handle emojis
  parserPreset: {
    parserOpts: {
      // This regex extracts type, scope, and subject from commits with emojis
      // Format: "emoji  type(scope): subject" or "emoji  type: subject"
      headerPattern:
        /^(?:[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])\s+(\w+)(?:\(([^)]*))\)?:\s(.+)$/u,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },

  // Define all rules inline (not using extends to avoid ES module issues)
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'scope-case': [2, 'always', 'lower-case'],
  },
};
