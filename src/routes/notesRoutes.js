import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import { 
	getAllNotes, 
	getNoteById, 
    createNote,
    deleteNote,
    updateNote,
} from '../controllers/notesController.js';
// 1. Імпортуємо middleware
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
// 2. Додаємо middleware до всіх шляхів, що починаються з /notes
router.use("/notes", authenticate);

/* GET /notes */
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
//router.get('/notes', getAllNotes);

/* GET /notes/:noteId */
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

/* DELETE /notes/:noteId */
router.delete('/notes/:noteId', celebrate(deleteNoteSchema), deleteNote);

/* POST /notes */
router.post('/notes', celebrate(createNoteSchema), createNote);

/* PATCH /notes/:noteId */
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);




export default router;

