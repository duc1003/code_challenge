import { Schema, model } from "mongoose";
import { IResource } from "../interfaces/IResources";


const ResourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    tags: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft"
    },
    metadata: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

ResourceSchema.index({ title: "text", description: "text" });

export const Resource = model<IResource>("Resource", ResourceSchema);