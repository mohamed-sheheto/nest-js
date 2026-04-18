import { Exclude } from 'class-transformer';

export class userResponseDto {
  readonly username: string;
  readonly email: string;

  // @Expose({ name: 'Address' }) => provide alias name for a property
  readonly country: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<userResponseDto>) {
    Object.assign(this, partial);
  }
}
