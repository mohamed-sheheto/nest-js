import { SetMetadata } from '@nestjs/common';

export const Is_Public_Key = 'Is_Public';

export const Public = () => SetMetadata(Is_Public_Key, true);
