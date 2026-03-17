import "dotenv/config";

import app from "./app.js";
import { PORT } from "./config/env.js";

app.listen(PORT, () => {
  console.log(`[server] running on port ${PORT} in ${process.env.NODE_ENV ?? "development"} mode`);
});
