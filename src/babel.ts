async function start() {
  return Promise.resolve('async is working');
}

start().then(console.log);

class Util {
  static id = new Date();
};

console.log('Util Id: ', Util.id);

export default 1;
