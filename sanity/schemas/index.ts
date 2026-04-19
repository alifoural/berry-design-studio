import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { project } from './project'
import { category } from './category'

export const schemaTypes: SchemaTypeDefinition[] = [post, project, category]