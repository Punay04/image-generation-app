import { z } from "zod";

export const TrainModelSchema = z.object({
  name: z.string(),
  type: z.enum(["Man", "Women", "Others"]),
  age: z.number().min(1).max(100),
  ethinicity: z.enum([
    "Asian",
    "Black",
    "White",
    "American",
    "MiddleEastern",
    "Pacific",
    "Hispanic",
  ]),
  eyecolor: z.enum([
    "Black",
    "Blue",
    "Brown",
    "Gray",
    "Green",
    "Hazel",
  ]),
  bald: z.boolean(),
  image: z.array(z.string().url()),
});

export const GenerateImageSchema = z.object({
  prompt: z.string(),
  modelId: z.string(),
  numberOfImages: z.number().min(1).max(10),
});

export const GenerateImagesFromPackSchema = z.object({
  modelId: z.string(),
  packID: z.string(),
});
