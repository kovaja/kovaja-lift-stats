const RecordRoute = require('./record/record.route');
const AdminRoute = require('./admin/admin.route');

const initalizeRouter = (express) => {
  const router = express.Router();

  new RecordRoute(router);
  new AdminRoute(router);

  return router;
}

module.exports = {
  initalizeRouter: initalizeRouter
};