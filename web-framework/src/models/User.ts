import { AxiosResponse } from 'axios';
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
    this.sync = new Sync<UserProps>(rootUrl);
    this.attributes = new Attributes<UserProps>(attrs)
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(updatedData: UserProps): void {
    this.attributes.set(updatedData);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      })
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch((): void => {
        this.trigger('error');
      });
  }
}