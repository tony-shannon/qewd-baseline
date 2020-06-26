const Piscina = require('piscina');
const path = require('path');

const piscina = new Piscina({
  filename: path.resolve(__dirname, 'pworker.js'),
  idleTimeout: 10000
});

(async function() {
  const result = await piscina.runTask({ documentName: 'Person' });
  console.log(result);
})();
