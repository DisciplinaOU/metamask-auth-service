import express from 'express';
import { expressjwt } from 'express-jwt';

import { config } from '../../config.js';
import * as controller from './controller.js';

export const userRouter = express.Router();

/** GET /api/users */
userRouter.route('/').get(controller.find);

/** GET /api/users/current */
/** Authenticated route */
userRouter.route('/current').get(expressjwt(config), controller.get);

/** POST /api/users */
userRouter.route('/').post(controller.create);

/** PATCH /api/users/:userId */
/** Authenticated route */
userRouter.route('/current').patch(expressjwt(config), controller.patch);
