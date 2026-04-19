import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { post } from './sanity/schemas/post'
import { project } from './sanity/schemas/project'
import { category } from './sanity/schemas/category'
import { author } from './sanity/schemas/author'

export default defineConfig({
  name: 'default',
  title: 'Berry Design Studio',
  projectId: 'r1uw45l0',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [post, project, category, author],
  },
})