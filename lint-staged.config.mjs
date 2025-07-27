/** @type {import('lint-staged').Config} */
export default {
  '*.{css,scss}': (stagedFiles) => {
    const files = stagedFiles.join(' ');
    return [`prettier --write --ignore-path .prettierignore ${files}`];
  },
  '*.{ts,tsx,vue}': (stagedFiles) => {
    const files = stagedFiles.join(' ');
    return [
      `prettier --write --ignore-path .prettierignore ${files}`,
      'vue-tsc --noEmit --project tsconfig.json', // Not add "files"
      `eslint --no-cache ${files}`,
    ];
  },
};
