/* Decorators */

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
