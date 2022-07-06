import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users'

export class User {
  public events: Eventing;
  public sync: Sync<UserProps>;
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.events = new Eventing();
    this.sync  = new Sync<UserProps>(rootUrl);
    this.attributes = new Attributes<UserProps>(attrs)
  }
}