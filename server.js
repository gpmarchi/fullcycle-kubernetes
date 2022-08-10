import http from 'http';
import fs from 'fs/promises';
import HttpDispatcher from 'httpdispatcher';

const host = '0.0.0.0';
const port = 3333;

const startedAt = Math.floor(Date.now() / 1000);

const dispatcher = new HttpDispatcher();

dispatcher.onGet("/", function(request, response) {
	const name = process.env.NAME;
	const age = process.env.AGE;

  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(`<h1>Hello, I'm ${name}. I'm ${age} years old.</h1>`);
});

dispatcher.onGet("/configmap", async function (request, response) {
  try {
    const data = await fs.readFile('./myfamily/family.txt', { encoding: 'utf8' });
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(data);
  } catch (error) {
    console.error(error);
  }
});

dispatcher.onGet("/secret", function(request, response) {
	const user = process.env.USER;
	const password = process.env.PASSWORD;

  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(`<h1>User: ${user}. Password ${password}.</h1>`);
});

dispatcher.onGet("/healthz", function(request, response) {
	const duration = Math.floor(Date.now()  / 1000) - startedAt;

	if (duration < 10 || duration > 30) {
		response.writeHead(500);
	  response.end(`Duration: ${duration}`);
	} else {
		response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end("ok");
	}
});

dispatcher.onError(function(request, response) {
  response.writeHead(404);
  response.end("Error, the URL doesn't exist");
});

const requestListener = function (request, response) {
	try {
		console.log(request.url);
		dispatcher.dispatch(request, response);
	} catch (error) {
    console.error(error);
	}
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});