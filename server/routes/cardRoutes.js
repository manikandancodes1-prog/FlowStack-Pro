const express = require('express');
const router = express.Router();

const { createCard, getCards, updateCard, deleteCard } = require('../controllers/cardController');
const { protect } = require('../middleware/authMiddleware');


router.route('/')
  .post(protect, createCard) 
  .get(protect, getCards);


router.route('/:id').put(protect, updateCard);


router.route('/:id').put(protect, updateCard).delete(protect, deleteCard);

module.exports = router;