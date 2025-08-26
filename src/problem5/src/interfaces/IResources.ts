import { Document } from "mongoose";

export type ResourceStatus = "draft" | "published" | "archived";

export interface IResource extends Document {
  title: string;
  description?: string;
  tags: string[];
  status: ResourceStatus;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}