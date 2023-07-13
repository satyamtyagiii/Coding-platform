const express = require('express');
const router = express.Router();
const isAdmin = require('./isAdminMiddleware');
const Question = require('../models/Question');
router.post('/questions/:questionId/testcases', isAdmin, async (req, res) => {
    const { questionId } = req.params;
    const { input, output } = req.body;
  
    try {
      // Find the question
      const question = await Question.findById(questionId);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      // Add the test case to the question
      question.testCases.push({ input, output });
  
      // Save the updated question
      await question.save();
  
      res.json(question);
    } catch (error) {
      console.error('Error adding test case:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/questions/:questionId/testcases', isAdmin, async (req, res) => {
    const { questionId } = req.params;
  
    try {
      // Find the question
      const question = await Question.findById(questionId);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      res.json(question.testCases);
    } catch (error) {
      console.error('Error fetching test cases:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;
