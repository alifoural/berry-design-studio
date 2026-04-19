import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Berry Design Studio',
  projectId: 'r1uw45l0',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: { types: [] },
})