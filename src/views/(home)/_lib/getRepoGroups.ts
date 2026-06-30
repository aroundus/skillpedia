import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { load } from 'js-yaml';

export interface RepoGroup {
  name: string;
  repos: string[];
}

export const getRepoGroups = (): RepoGroup[] => {
  const filePath = join(process.cwd(), 'repositories.yaml');
  const content = readFileSync(filePath, 'utf8');

  return (load(content) || []) as RepoGroup[];
};
