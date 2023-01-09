import fetch from "node-fetch";

fetch("https://api.jsonbin.io/v3/b/63bbd6e715ab31599e31a86b", {
      method: "GET",
      headers: {
        "X-Master-Key": "$2b$10$SOyMCFXjSEVKMVNeq544oeeSVKbcZMS7XHwowGRAjZvxIBfF.gZ8u"
      },
    }).then((r) => r.json()).then(data => console.log(data));