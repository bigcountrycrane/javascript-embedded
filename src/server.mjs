import dotenv from "dotenv";
import express from "express";
import { FlatfileClient } from "@flatfile/api";
import cors from "cors"; // Import the cors module

dotenv.config();

const app = express();
const port = 8080;

const flatfile = new FlatfileClient({
  token: process.env.SECRET_KEY,
  environment: process.env.BASE_URL + "/v1",
});

// Enable CORS middleware
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/space", async (req, res) => {
  try {
    const space = await flatfile.spaces.get(process.env.SPACE_ID);
    res.json(space);
  } catch (error) {
    console.error("Error retrieving space:", error);
    res.status(500).json({ error: "Failed to retrieve space" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
