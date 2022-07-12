import { User } from '../models/User';

export class UserForm {
  constructor(public parent: HTMLElement, public model: User) {
    this.bindModel();
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    })
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-name': this.onSetName,
      'click:.set-age': this.onSetAge,
    }
  }

  onSetName = (): void => {
    const input = this.parent.querySelector('input');
    
    if(input) {
      const name = input.value;
      this.model.set({ name });
    }
  }

  onSetAge = (): void => {
    this.model.setRandomAge();
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>Age: ${this.model.get('age')}</div>
        <input type="text" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `;
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let key in eventsMap) {
      const [eventName, selector] = key.split(':');

      fragment.querySelectorAll(selector).forEach(el => {
        el.addEventListener(eventName, eventsMap[key]);
      });
    }
  }

  render(): void {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}