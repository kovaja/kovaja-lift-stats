const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

// app.use(express.static('assets'))

// app.get('/', (request, response) => {
//     response.send('Hello World!');
// });

const staticPath = path.join(__dirname,'assets');
console.log(staticPath);

app.get('/*', express.static(staticPath));

app.listen(PORT, () => console.log('Lift-stat server listening on ' + PORT));