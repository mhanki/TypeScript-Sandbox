import { User } from './models/User';

const user = new User({ name: 'Tala', age: 48 });

user.events.on('change', (() => console.log('change')));
user.events.trigger('change');