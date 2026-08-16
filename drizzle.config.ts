import 'dotenv/config'
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/auth/*.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: "mysql://root:password@localhost:3306/ngs",
  },
});
