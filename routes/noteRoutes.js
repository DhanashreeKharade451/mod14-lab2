//new router file for your Bookmark resources

import express from 'express'

const router = express.Router()

import Note from '../models/Notes.js'
import { authMiddleware } from '../utils/auth.js'
 
// Apply authMiddleware to all routes in this file
router.use(authMiddleware);
 
// GET /api/notes - Get all notes for the logged-in user
// THIS IS THE ROUTE THAT CURRENTLY HAS THE FLAW
router.get('/', async (req, res) => {
  console.log(req.user)

try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);

  }


//   // This currently finds all notes in the database.
//   // It should only find notes owned by the logged in user.
//   try {
//     //find the notes first so we can check which user created it (ownership)
//     const foundNote = await findById(re.params.id)

//     if(!foundNote){
//        return res.status(400).json({message: "No note found with this id!"});
//     }

//     console.log(foundNote.user, req.user._id)
// //if they dont match its
//     if(foundNote.user.toString() !== req.us._id){
//        return res.status(401).json({message:"This note does not belong to you"})
//     }
//     //this need authorization check
//     const notes = await Note.find({user: req.user._id});
//     res.json(notes);
//   } catch (err) {
//     res.status(500).json(err);
//   }
});
 
// POST /api/notes - Create a new note
router.post('/', async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      // The user ID needs to be added here
      user: req.user._id
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
});
 
// PUT /api/notes/:id - Update a note
router.put('/:id', async (req, res) => {
  try {
    // This needs an authorization check
    //const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
      const foundNote = await Note.findById(req.params.id)
    if (!foundNote) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }
    
     
    // compare the note's user id with the logged in user's id 
    // if they don't match, it's not our note and we shouldn't be able to update it 
    if (foundNote.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'User is not authorized to update this note.' })
    }

    // This needs an authorization check
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});
// DELETE /api/notes/:id - Delete a note
router.delete('/:id', async (req, res) => {
  try {
    // This needs an authorization check
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }

     if (foundNote.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'User is not authorized to delete this note.'
      });
    }
    
    res.json({ message: 'Note deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});
 
export default router