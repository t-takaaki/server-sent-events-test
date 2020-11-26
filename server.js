const polka = require("polka");
const sirv = require("sirv");

const server = polka().listen(3000, err => {
  if (err) throw err;
  console.log("> Running on localhost: 3000");
});

server
  .use(sirv('public'))
  .get("/api", (req, res) => {
    res.end("hi!");
  })
  .get("/subscribe", (req, res) => {
    console.log("subscribed!");
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
    });
    let times = 0;
    let timer = setInterval(() => {
      times++;
      res.write(`data: hello! ${times} times.\nid:${times}\n\n`);
      if (times === 4) {
        clearInterval(timer);
        // send custom event.
        // see: https://ja.javascript.info/server-sent-events#ref-980
        res.write("event: stop\ndata: bye-bye\n\n");
        res.end("end server events!");
      }
    }, 1000);
  });
