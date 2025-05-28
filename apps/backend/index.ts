import express from "express";
import {
  TrainModelSchema,
  GenerateImageSchema,
  GenerateImagesFromPackSchema,
} from "common/types";
import {prismaClient} from "db"

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());

app.post("/ai/training", async (req, res) => {
  const parsedBody = TrainModelSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({
      error: "Invalid request body",
      details: parsedBody.error.errors,
    });
    return;
  }

  await prismaClient.model.create({
    data: {
      name: parsedBody.data.name,
      type: parsedBody.data.type,
      age: parsedBody.data.age,
      ethinicity: parsedBody.data.ethinicity,
      eyeColor: parsedBody.data.eyecolor,
      bald: parsedBody.data.bald,
    },
  });
});

app.post("/ai/generate", (req, res) => {});

app.post("/pack/generate", (req, res) => {});

app.get("/pack/bulk", (req, res) => {});

app.get("/image", (req, res) => {});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
