import { Router } from "express";
import {
  createResource,
  listResources,
  getResource,
  updateResource,
  deleteResource
} from "../controllers/Resource.controller";
import { validate } from "../middlewares/validate";

const router = Router();

router.post("/", validate(["title", "description"]), createResource);
router.get("/", listResources);
router.get("/:id", getResource);
router.patch("/:id", updateResource);
router.delete("/:id", deleteResource);

export default router;
