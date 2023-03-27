import { NextFunction, Request, Response } from "express";

import { User } from "../../models/user.model.js";

export const find = (req: Request, res: Response, next: NextFunction) => {
  // If a query string ?publicAddress=... is given, then filter results
  const whereClause =
    req.query && req.query.publicAddress
      ? {
          where: { publicAddress: req.query.publicAddress as string },
        }
      : undefined;

  return User.findAll(whereClause)
    .then((users: User[]) => res.json(users))
    .catch(next);
};

export const get = (req: Request, res: Response, next: NextFunction) => {
  return User.findByPk((req as any).auth.data.id)
    .then((user: User | null) => res.json(user))
    .catch(next);
};

export const create = (req: Request, res: Response, next: NextFunction) =>
  User.create(req.body)
    .then((user: User) => res.json(user))
    .catch(next);

export const patch = (req: Request, res: Response, next: NextFunction) => {
  return User.findByPk((req as any).auth.data.id)
    .then((user: User | null) => {
      if (!user) {
        return user;
      }

      Object.assign(user, req.body);
      return user.save();
    })
    .then((user: User | null) => {
      return user
        ? res.json(user)
        : res.status(401).send({
            error: `User with publicAddress ${req.params.userId} is not found in database`,
          });
    })
    .catch(next);
};
