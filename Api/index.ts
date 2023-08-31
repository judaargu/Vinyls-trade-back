import server from './src/app'
import {sequelize} from "./src/db";

server.listen(3001, () => {
  sequelize.sync({force: true})
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });