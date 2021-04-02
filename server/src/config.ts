import dotenv from "dotenv";

const result = dotenv.config();
if (result.error) throw result.error;

export const getEnv = (env: string) => {
  const val = process.env[env];
  if (!val) throw new Error(`Set the "${env}" variable.`);
  return val;
};

export const DEBUG = getEnv("NODE_ENV") === "development";
