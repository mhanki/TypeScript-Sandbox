import { User } from './models/User';

const newUser = { id: 1 }

const user = User.buildUser(newUser);

user.on('change', () => { console.log(user) });

user.fetch();