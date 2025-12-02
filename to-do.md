# Authorization Fix – To-Do List

## Task 1: Associate Notes with Users

- [ ] **Update Note model**

  - [ ] Add `user` (ObjectId, ref: "User", required) to `models/Note.js`.

- [ ] **Modify Create Note route (POST /api/notes)**
  - [ ] Attach `req.user._id` to the new note’s `user` field before saving.

## Task 2: Implement Ownership-Based Authorization

### Read

- [ ] **Filter Get All Notes (GET /api/notes)**

  - [ ] Return only notes where `note.user === req.user._id`.

- [ ] **(Optional) Secure Get Single Note (GET /api/notes/:id)**
  - [ ] Ensure the requested note belongs to the authenticated user.
  - [ ] If not, return `403 Forbidden`.

### Update

- [ ] **Secure Update Note (PUT /api/notes/:id)**
  - [ ] Find note by ID.
  - [ ] Check if `note.user === req.user._id`.
  - [ ] If yes → proceed with update.
  - [ ] If not → return `403 Forbidden`.

### Delete

- [ ] **Secure Delete Note (DELETE /api/notes/:id)**
  - [ ] Find note by ID.
  - [ ] Check if the user owns it.
  - [ ] If yes → delete.
  - [ ] If not → return `403 Forbidden`.

## Acceptance Criteria Review

- [ ] Note model has required `user` reference.
- [ ] POST route assigns user ID correctly.
- [ ] GET route returns only the user's notes.
- [ ] PUT/DELETE routes enforce ownership with `403` on unauthorized access.
- [ ] API works correctly for all valid, authorized operations.
