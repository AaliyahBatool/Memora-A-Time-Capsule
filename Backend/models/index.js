import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import Sequelize from "sequelize";
import process from "process";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const env = process.env.NODE_ENV || "development";
const configPath = pathToFileURL(path.join(dirname, "../config/config.json")).href; // ✅ Fix absolute path issue

const db = {};
let sequelize;

try {
  if (!fs.existsSync(fileURLToPath(configPath))) {
    throw new Error(`Database config file not found at ${configPath}`);
  }
  const config = JSON.parse(fs.readFileSync(fileURLToPath(configPath), "utf8"))[env];

  sequelize = new Sequelize(config.database, config.username, config.password, config);

  await sequelize.authenticate();
  console.log("✅ Database connected successfully.");
} catch (error) {
  console.error("❌ Error setting up Sequelize:", error);
  process.exit(1);
}

// Load models dynamically using ES modules
const modelFiles = fs.readdirSync(dirname).filter(file => file.endsWith(".js") && file !== "index.js");

for (const file of modelFiles) {
  const modelPath = pathToFileURL(path.join(dirname, file)).href; // ✅ Convert to file:// URL
  const modelModule = await import(modelPath);
  const model = modelModule.default;
  db[model.name] = model;
}

// Apply associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize };
export default db;
