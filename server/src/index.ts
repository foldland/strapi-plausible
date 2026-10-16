/**
 * Application methods
 */
// import bootstrap from './bootstrap';
// import destroy from './destroy';
// import register from './register';

/**
 * Plugin server methods
 */
import config from './config/index.ts'
import configController from './controllers/config.ts'
import routes from './routes/index.ts'

export default {
  config: config,
  controllers: {
    config: configController,
  },
  routes: routes,
}
