/* --------- Decorators ---------- */

@classDecorator
class Boat {
  @testDecorator
  color: string = 'red';

  @testDecorator
  get formattedColor(): string {
    return `This boats color is ${this.color}`;
  }

  @logError('Something bad!')
  pilot(
    @parameterDecorator speed: string,
    @parameterDecorator generateWake: boolean
  ): void {
    if (speed === 'fast') {
      console.log('swish');
    } else {
      console.log('nothing');
    }
  }
}

function classDecorator(constructor: typeof Boat) {
  console.log(constructor);
}

function parameterDecorator(target: any, key: string, index: number) {
  console.log(key, index);
}

// Using decorators around a property definition inside a class, we can not get direct access to that property because the decorator is being executed before we ever even create an instance. The only argument that we get using the decorator is the prototype
function testDecorator(target: any, key: string): void {
  console.log(target);
  console.log(key);
}

// "Decorator factory"
function logError(errorMessage: string) {
  return function(target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;
  
    desc.value = function() {
      try {
        method();
      } catch (err) {
        console.log(errorMessage);
      }
    }
  }
}



/* --------- Metadata ---------- */

import 'reflect-metadata'

/* const plane = {
  color: 'red'
};

Reflect.defineMetadata('note', 'hi there!', plane);
console.log(plane);

const note = Reflect.getMetadata('note', plane);
console.log(note);

Reflect.defineMetadata('note', '🌶️', plane, 'color');
const colorNote = Reflect.getMetadata('note', plane, 'color');
console.log(colorNote); */

@printMetadata
class Plane {
  color: string = 'red'

  @markFunction('HI THERE!')
  fly(): void { 
    console.log('vrrrrrrrr');
  }
}

function markFunction(secretInfo: string) { 
  return function(target: Plane, key: string) {
    Reflect.defineMetadata('secret', secretInfo, target, key);
  }
}

/* const secret = Reflect.getMetadata('secret', Plane.prototype, 'fly');
console.log(secret); */

function printMetadata(target: typeof Plane) {  // typeof Plane is a reference to the constructor function
  for (let key in target.prototype) { // only works with ES5
    const secret = Reflect.getMetadata('secret', target.prototype, key);
    console.log(secret);
  }
}