const express = require('express');
const app = express();

app.get('/:number', function (req, res) {
  const number = req.params.number;
  var fibonacci = [];
  fibonacci[0] = 0;
  fibonacci[1] = 1;
  
  for (var i = 2; i < number; i++) {
    fibonacci[i] = fibonacci[i - 2] + fibonacci[i - 1];
}
      res.json({fibonacci});
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});