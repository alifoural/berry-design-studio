import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Berry Design Studio',
  projectId: 'r1uw45l0',
  dataset: 'production',
  basePath: '/studio',
  cors: {
    allowedOrigin: 'https://mzcb44mx-3333.inc1.devtunnels.ms',
  },
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})