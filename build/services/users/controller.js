import { User } from '../../models/user.model.js';
export const find = (req, res, next) => {
    // If a query string ?publicAddress=... is given, then filter results
    const whereClause = req.query && req.query.publicAddress
        ? {
            where: { publicAddress: req.query.publicAddress },
        }
        : undefined;
    return User.findAll(whereClause)
        .then((users) => res.json(users))
        .catch(next);
};
export const get = (req, res, next) => {
    return User.findByPk(req.auth.data.id)
        .then((user) => res.json(user))
        .catch(next);
};
export const create = (req, res, next) => User.create(req.body)
    .then((user) => res.json(user))
    .catch(next);
export const patch = (req, res, next) => {
    return User.findByPk(req.auth.data.id)
        .then((user) => {
        if (!user) {
            return user;
        }
        Object.assign(user, req.body);
        return user.save();
    })
        .then((user) => {
        return user
            ? res.json(user)
            : res.status(401).send({
                error: `User with publicAddress ${req.params.userId} is not found in database`,
            });
    })
        .catch(next);
};
