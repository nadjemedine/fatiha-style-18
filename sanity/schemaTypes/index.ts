import type { SchemaTypeDefinition } from 'sanity';

import product from './product';
import category from './category';
import settings from './settings';
import feature from './feature';
import hero from './hero';
import project from './project';

export const schemaTypes: SchemaTypeDefinition[] = [
  product,
  category,
  settings,
  feature,
  hero,
  project,
];
