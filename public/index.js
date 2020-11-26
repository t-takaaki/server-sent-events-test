// https://ja.javascript.info/server-sent-events
!function() {
  console.log("hello! world.");
  const btn = document.getElementById("start");
  btn.addEventListener("click", event => {
    event.preventDefault();
    let eventSource = new EventSource("/subscribe");
    eventSource.onmessage = e => {
      console.log("new message: ", e.data);
    };
    eventSource.addEventListener("open", () => {
      console.log("event: open!");
    });
    eventSource.addEventListener("stop", e => {
      // custom event.
      // see: https://ja.javascript.info/server-sent-events#ref-980
      eventSource.close();
      console.log("event: stopped!", e.data);
    });
  });
}();
