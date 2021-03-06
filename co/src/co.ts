import { co } from 'co';

export function Async() {
  return (target: any, propertyKey: string | symbol, descriptor: any) => {
    let method = descriptor.value;

    descriptor.value = function (...args) {
      let self = this;
      return co(function *() {
        return yield method.apply(self, args);
      });
    };

    return descriptor;
  };
};
