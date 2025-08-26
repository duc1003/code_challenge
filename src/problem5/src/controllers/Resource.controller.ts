import { Request, Response } from "express";
import { Resource } from "../models/Resource";

export const createResource = async (req: Request, res: Response) => {
  const doc = await Resource.create(req.body);
  return res.status(201).json(doc);
};

export const listResources = async (req: Request, res: Response) => {
  const {
    q,
    status,
    tag,
    createdFrom,
    createdTo,
    page = "1",
    limit = "10",
    sortBy = "createdAt",
    order = "desc"
  } = req.query as Record<string, string | undefined>;

  const filter: any = {};

  if (q) {
    filter.$text = { $search: q as string };
  }
  if (status) {
    filter.status = status;
  }
  if (tag) {
    filter.tags = { $in: [tag] };
  }
  if (createdFrom || createdTo) {
    filter.createdAt = {};
    if (createdFrom) filter.createdAt.$gte = new Date(createdFrom);
    if (createdTo) filter.createdAt.$lte = new Date(createdTo);
  }

  const pageNum = Math.max(parseInt(page || "1", 10), 1);
  const limitNum = Math.min(Math.max(parseInt(limit || "10", 10), 1), 100);

  const sort: Record<string, 1 | -1> = {
    [sortBy!]: order === "asc" ? 1 : -1
  };

  const [items, total] = await Promise.all([
    Resource.find(filter).sort(sort).skip((pageNum - 1) * limitNum).limit(limitNum),
    Resource.countDocuments(filter)
  ]);

  return res.json({
    items,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum)
    }
  });
};

export const getResource = async (req: Request, res: Response) => {
  const doc = await Resource.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  return res.json(doc);
};

export const updateResource = async (req: Request, res: Response) => {
  const doc = await Resource.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!doc) return res.status(404).json({ message: "Not found" });
  return res.json(doc);
};

export const deleteResource = async (req: Request, res: Response) => {
  const doc = await Resource.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  return res.status(204).send();
};
