var http = require("http");
var fs = require("fs");

var parametros = [];
var valores = [];

http.createServer(function (req, res) {
  if (req.url.indexOf('?') > 0) {
    var url_data = req.url.split('?');
    var arreglo_parametros = url_data[1].split('&');
    for (var i = 0; i < arreglo_parametros.length; i++) {
      var parametro = arreglo_parametros[i];
      var param_data = parametro.split('=');
      parametros[i] = param_data[0];
      valores[i] = param_data[1];
    }

    fs.readFile('your_html_file.html', 'utf8', function (err, data) {
      if (!err) {
        var html_string = data;
        for (var i = 0; i < parametros.length; i++) {
          html_string = html_string.replace('{' + parametros[i] + '}', valores[i]);
        }
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.write(html_string);
        res.end();
      } else {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.write('File not found');
        res.end();
      }
    });
  }
}).listen(8080);
