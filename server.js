import http from 'http';

const host = '0.0.0.0';
const port = 3333;

const requestListener = function (req, res) {
	const name = process.env.NAME;
	const age = process.env.AGE;

  res.writeHead(200);
  res.end(`Hello, I'm ${name}. I'm ${age} years old.`);
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});