import express from "express";
import sequelize from "./db";

const main = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  const app = express();
  app.use(express.json());

  app.listen(5000, () => {
    console.log("Listening at http://localhost:5000");
  });
};

main();
