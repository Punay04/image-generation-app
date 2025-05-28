import express from "express";
import {
  TrainModelSchema,
  GenerateImageSchema,
  GenerateImagesFromPackSchema,
} from "common/types";
import { prismaClient } from "db";

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());

const USER_ID = "userId";

app.post("/ai/training", async (req, res) => {
  const parsedBody = TrainModelSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({
      error: "Invalid request body",
      details: parsedBody.error.errors,
    });
    return;
  }

  const data = await prismaClient.model.create({
    data: {
      name: parsedBody.data.name,
      type: parsedBody.data.type,
      age: parsedBody.data.age,
      ethinicity: parsedBody.data.ethinicity,
      eyeColor: parsedBody.data.eyecolor,
      bald: parsedBody.data.bald,
      userId: USER_ID,
    },
  });

  res.json({
    message: "Model training started",
    modelId: data.id,
  });
});

app.post("/ai/generate", async (req, res) => {
  const parsedBody = GenerateImageSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({
      error: "Invalid request body",
      details: parsedBody.error.errors,
    });
    return;
  }

  const data = await prismaClient.outputImage.create({
    data: {
      modelId: parsedBody.data.modelId,
      prompt: parsedBody.data.prompt,
      userId: USER_ID,
      imageUrl: "https://example.com/image.png", // Placeholder URL,
    },
  });
});

app.post("/pack/generate", async (req, res) => {
  const parsedBody = GenerateImagesFromPackSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({
      error: "Invalid request body",
      details: parsedBody.error.errors,
    });
    return;
  }

  const data = await prismaClient.packs.createMany({
    data: {
      name: parsedBody.data.name,
    },
  });
});

app.get("/pack/bulk", (req, res) => {});

app.get("/image", (req, res) => {});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
