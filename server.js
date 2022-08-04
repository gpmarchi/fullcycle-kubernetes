import http from 'http';
import fs from 'fs/promises';
import HttpDispatcher from 'httpdispatcher';

const host = '0.0.0.0';
const port = 3333;

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