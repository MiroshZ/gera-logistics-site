import * as migration_20261028_021123_init_schema from './20261028_021123_init_schema';

export const migrations = [
  {
    up: migration_20261028_021123_init_schema.up,
    down: migration_20261028_021123_init_schema.down,
    name: '20261028_021123_init_schema'
  },
];
