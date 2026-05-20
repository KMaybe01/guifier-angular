/** @type {import('lint-staged').Configuration} */
export default {
  'src/**/*.{ts,html}': ['biome check --fix'],
  'src/**/*.{css,md,json}': ['biome check --fix'],
}
