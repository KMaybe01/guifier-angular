/** @type {import('lint-staged').Configuration} */
export default {
  'src/**/*.{ts,html}': ['eslint --fix', 'prettier --write'],
  'src/**/*.{css,md,json}': ['prettier --write'],
}
