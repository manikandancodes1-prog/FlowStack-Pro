const Card = require('../models/Card');

exports.createCard = async (req, res) => {
  const { title, status } = req.body;

  try {
    
    if (!req.user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const card = await Card.create({
      title,
      status: status || 'TO DO',
      user: req.user._id 
    });

    res.status(201).json(card);
  } catch (error) {
    console.error("Card Create Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};


exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({ user: req.user._id });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: "Fetch cards error" });
  }
};


exports.updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (card) {
      
      if (card.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "அனுமதி இல்லை" });
      }

      card.status = req.body.status || card.status;
      const updatedCard = await card.save();
      res.json(updatedCard);
    } else {
      res.status(404).json({ message: "கார்டு கண்டறியப்படவில்லை" });
    }
  } catch (error) {
    res.status(500).json({ message: "Update error" });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: "கார்டு கண்டறியப்படவில்லை" });
    }

    
    if (card.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "அனுமதி இல்லை" });
    }

    await card.deleteOne();
    res.json({ message: "கார்டு வெற்றிகரமாக நீக்கப்பட்டது" });
  } catch (error) {
    res.status(500).json({ message: "Delete error: " + error.message });
  }
};