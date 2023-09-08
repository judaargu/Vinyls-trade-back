import server from './src/app'
import {sequelize} from "./src/db";
import {PORT} from "./config";
server.listen(PORT, () => {
  sequelize.sync({force: false})
    console.log(`Server listening on port: ${PORT}`); // eslint-disable-line no-console
  });