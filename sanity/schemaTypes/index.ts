import type { SchemaTypeDefinition } from 'sanity';

import product from './product';
import category from './category';
import settings from './settings';
import feature from './feature';
import hero from './hero';
import project from './project';
import order from './order';
import deliveryPrice from './deliveryPrice';
import menu from './menu';

export const schemaTypes: SchemaTypeDefinition[] = [
  product,
  category,
  settings,
  feature,
  hero,
  project,
  order,
  deliveryPrice,
  menu,
];
