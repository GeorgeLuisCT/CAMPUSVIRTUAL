require('dotenv').config();
const app = require('./server');
require('./database');

app.listen(app.get('port'), ()=> {
    console.log(`app listening at http://localhost:${app.get('port')}`)
})