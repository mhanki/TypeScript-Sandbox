import { View } from '../views/View';
import { User, UserProps } from '../models/User';

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-name': this.onSetName,
      'click:.set-age': this.onSetAge,
      'click:.save-model': this.onSaveModel
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

  onSaveModel = (): void => {
    this.model.save();
  }

  template(): string {
    return `
      <div>
        <input type="text" placeholder="${this.model.get('name')}" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save User</button>
      </div>
    `;
  }
}