import { type SchemaTypeDefinition } from 'sanity'
import { profile } from './profile';
import { socials } from './socials';
import { project } from './project';
import { experience } from './experience';

// Combined all schemas into a single source of truth
export const schemaTypes = [
  profile, 
  socials,
  project,
  experience
];

// If your sanity.config.ts uses 'schema', keep this too, but point to the new array
export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}