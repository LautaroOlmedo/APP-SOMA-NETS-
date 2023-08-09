import { SetMetadata } from '@nestjs/common';

// ---------- ---------- ---------- ---------- ----------

import { ROLES } from 'src/constants';
import { ACCES_LEVEL_KEY } from 'src/constants/key-decorators';

export const AccesLevel = (level: number) =>
  SetMetadata(ACCES_LEVEL_KEY, level);
