import fetch from "node-fetch";
import { JSDOM } from "jsdom";

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const jsonBinAPIKey = process.env.APIKEY;
(async () => {
  let alreadyChecked;
  let mexp;

  while (true) {
    let checkDate = new Date();
    console.log(checkDate.getHours());
    while (checkDate.getHours() !== 14) {
      console.log("nope");
      sleep(10000);
      checkDate = new Date();
    }

    const response = await fetch(
      "https://guildelesgaulois.fr/user/936-misteryan"
    );
    const text = await response.text();
    const dom = await new JSDOM(text);
    let expBox = dom.window.document.querySelector(
      ".profile-infos__container"
    ).textContent;
    const expMonthly = expBox.match(/(?<=EXP Mensuel : ).*/)[0];

    fetch("https://api.jsonbin.io/v3/b/63bbd6e715ab31599e31a86b", {
      method: "GET",
      headers: {
        "X-Master-Key": jsonBinAPIKey,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        let mexp = data.record.mexp;
        sleep(1000);
        console.log("mexp " + mexp);
        let dailyexp = Number(expMonthly.replace(/\s+/g, '')) - Number(mexp.replace(/\s+/g, ''));
        console.log("dexp " + dailyexp);
        const request2send = {
          changed: checkDate,
          mexp: expMonthly,
          dexp: dailyexp.toString(),
        };
        fetch("https://api.jsonbin.io/v3/b/63bbd6e715ab31599e31a86b", {
          method: "PUT",
          body: JSON.stringify(request2send),
          headers: {
            "X-Master-Key": jsonBinAPIKey,
            "Content-Type": "application/json",
          },
        }).then((r) => {
          sleep(3600000);
        });
        sleep(2000);
      });
  }
})();