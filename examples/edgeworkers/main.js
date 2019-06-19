var HTML =
    '<html><head></head><body><h1>Akamai Edge World Conference</h1><h2>{message_text}</h2></body></html>';

function onClientRequest(request) {
  // Check for existance of "visits" cookie. If exists get value, if not value 0
  var visitsCookieValue = (request.cookies.hasOwnProperty('visits')) ? request.cookies['visits'] : 0;

  // Check value of cookie and replace place holder with appropriate message.
  if (visitsCookieValue > 1) {
    returnHTML = HTML.replace('{message_text}', 'Welcome back. You have visited this page ' + visitsCookieValue + ' times before.');
  }
  else if (visitsCookieValue == 1) {
    returnHTML = HTML.replace('{message_text}','Welcome back. You have visited this page once before.');
  }
  else {
    returnHTML = HTML.replace('{message_text}', 'Welcome, This is your first visit to this page.');
  }

  request.respondWith(new Response(200, {'Set-Cookie': ['visits=' + ++visitsCookieValue + ';']}, returnHTML));
}

function onOriginRequest(request) {}

function onOriginResponse(request, response) {}

function onClientResponse(request, response) {
  response.headers['Content-Type'] = ['text/html; charset=UTF-8'];
  response.headers['X-Powered-By'] = ['Akamai EdgeWorkers'];
}
