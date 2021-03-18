async function start() {
  return Promise.resolve('async is working');
}

start().then(console.log);
