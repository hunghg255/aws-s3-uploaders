import { dim } from 'kolorist';

import type { File } from './types';

export function logResult(files: File[]) {
  console.log(
    ['', `✓ ${files.length} files uploaded`, ...files.map((p: File) => `${dim(p.path)}`)].join(
      '\n',
    ),
  );
}
