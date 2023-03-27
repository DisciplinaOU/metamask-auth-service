import { INTEGER, Sequelize, STRING } from "sequelize";

import { User } from "./models/index.js";

const PSQL_CONN_STRING =
  process.env.PSQL_CONN_STRING ||
  "postgresql:///disciplina_metamask_login?host=/run/postgresql";

const sequelize = new Sequelize(PSQL_CONN_STRING);

// Init all models
User.init(
  {
    nonce: {
      allowNull: false,
      type: INTEGER.UNSIGNED, // SQLITE will use INTEGER
      defaultValue: (): number => Math.floor(Math.random() * 10000), // Initialize with a random nonce
    },
    publicAddress: {
      allowNull: false,
      type: STRING,
      unique: true,
      validate: { isLowercase: true },
    },
    username: {
      type: STRING,
      unique: true,
    },
  },
  {
    modelName: "user",
    sequelize, // This bit is important
    timestamps: false,
  }
);

// Create new tables
sequelize.sync();

export { sequelize };
