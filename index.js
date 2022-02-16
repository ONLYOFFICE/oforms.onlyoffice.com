const st = require("./static/data/def.json");

let sst = st.map((it, idx) => {
  if (it.id === idx) {
    return {id:"ok"};
  } else {
    return { id: idx };
  }
});

console.log(sst);
