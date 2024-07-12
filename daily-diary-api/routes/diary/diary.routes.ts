import express, { json } from "express";
import {
    addDiaryHandler,
    getAllDiaryHandler,
    getDiaryByIdHandler,
    updateDiaryVoteHandler,
} from "../../controllers/diary/diary.controller";

const router = express.Router();

router.post("/", json(), addDiaryHandler);
router.get("/", getAllDiaryHandler);
router.get("/:id", getDiaryByIdHandler);
router.patch("/:id", json(), updateDiaryVoteHandler);

export default router;
