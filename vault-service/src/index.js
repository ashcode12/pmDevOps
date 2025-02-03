require("dotenv").config();
const express = require("express");
const app = express();
const vaultRoutes = require("./routes/vaultRoutes");

app.use(express.json());
app.use("/vault", vaultRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Vault service running on port ${PORT}`));
