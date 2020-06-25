
const data = require("./test_data.json");
data.forEach(item => {
  console.log(`<div class='card'><div>${item.title}</div><div>${item.content}</div></div>`);
});
