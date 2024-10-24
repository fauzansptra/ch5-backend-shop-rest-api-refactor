const { Users } = require("../models");

const findUsers = async (req, res, next) => {
  try {
    const { name, age, address } = req.query;
    const condition = {};

    if (name) condition.name = { [Op.iLike]: `%${name}%` };
    if (age) condition.age = age;
    if (address) condition.address = { [Op.iLike]: `%${address}%` };

    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { sortBy = "name", order = "ASC" } = req.query;

    const users = await Users.findAndCountAll({
      where: condition,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, order.toUpperCase()]],
    });

    const totalData = users.count;
    const totalPages = Math.ceil(totalData / limit);

    res.status(200).json({
      status: "Success",
      data: {
        totalData,
        totalPages,
        currentPage: parseInt(page),
        users: users.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {}
};

const updateUser = async (req, res, next) => {
  const { name, age, role, address, shopId } = req.body;
  try {
    await Users.update(
      {
        name,
        age,
        role,
        address,
        shopId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "sukses update user",
    });
  } catch (err) {}
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete user",
    });
  } catch (err) {}
};

module.exports = {
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
