import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Subscription } from "./entities/Subscription";
import morgan from "morgan";
import { DEBUG, getEnv } from "./config";
import session from "express-session";
import authRoutes from "./routes/auth";
import subscriptionRoutes from "./routes/subscriptions";

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(-1);
});

const app = express();

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "track-subs",
    username: "postgres",
    password: "postgres",
    entities: [User, Subscription],
    synchronize: true,
    logging: DEBUG,
  });

  if (DEBUG) {
    app.use(morgan("dev"));
  }
  app.use(express.json());
  app.use(
    session({
      secret: getEnv("SECRET_KEY"),
      name: "qid",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: !DEBUG,
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      },
    })
  );

  app.use("/api/auth", authRoutes);
  app.use("/api/subscriptions", subscriptionRoutes);

  app.listen(5000, () => {
    console.log("http://localhost:5000");
  });
};

main();
