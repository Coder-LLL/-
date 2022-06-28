const worker = new Worker("./worker01.js");
worker.postMessage("hello");
worker.onmessage = (event) => {
  console.log(event.data); // 'world'
};
