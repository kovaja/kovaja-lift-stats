const RecordRoute = require('./record/record.route');
const AdminRoute = require('./admin/admin.route');

const initalizeRouter = (express) => {
  const router = express.Router();

  new RecordRoute(router);
  new AdminRoute(router)
  router.get('*', (req, res) => res.status(404).send('Unknown resource'));

  return router;
};

module.exports = {
  initalizeRouter: initalizeRouter
};