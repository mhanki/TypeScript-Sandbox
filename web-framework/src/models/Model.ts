import { AxiosPromise, AxiosResponse } from 'axios';

interface Events {
  on(eventName: string, calback: () => void): void;
  trigger(eventName: string): void;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(value: T): void;
  getAll(): T;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) { }

  // These shorthand assignments only work if the attributes are not being assigned in the constructor body, but beforehand (either as constructor arguments, or via direct assignment outside the constructor method)
  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  set(updatedData: T): void {
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