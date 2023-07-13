const express = require('express');
const router = express.Router();
const axios = require('axios');
const Question = require('../models/Question');
const isAdmin = require('./isAdminMiddleware');

router.post('/questions/:questionId/solution', async (req, res) => {
    const { questionId } = req.params;
    const { solution } = req.body;
  
    try {
      // Find the question
      const question = await Question.findById(questionId);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      // Call the Sphere Engine API to check the solution
      const response = await axios.post('https://api.compilers.sphere-engine.com/api/v4/submissions', {
        language: question.language,
        sourceCode: solution,
        input: question.testCases[0].input,
        expectedOutput: question.testCases[0].output,
        compiler: question.compilerId,
        clientId: 'YOUR_CLIENT_ID',
        clientSecret: 'YOUR_CLIENT_SECRET'
      });
  
      const { result, output } = response.data;
  
      // Check the result and provide appropriate response
      if (result === 15) {
        res.json({ status: 'success', output });
      } else if (result === 11) {
        res.json({ status: 'wrong', output });
      } else {
        res.json({ status: 'error', message: 'An error occurred' });
      }
    } catch (error) {
      console.error('Error checking solution:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  module.exports = router;
  
  // ...

router.get('/solution', isAdmin, async (req, res) => {
    const { page } = req.query;
    const skip = (page - 1) * PAGE_SIZE;
  
    try {
      const totalSubmissions = await submissions.countDocuments();
      const submissions = await Submission.find().skip(skip).limit(PAGE_SIZE);
  
      res.json({
        totalSubmissions,
        currentPage: parseInt(page),
        pageSize: PAGE_SIZE,
        submissions
      });
    } catch (error) {
      console.error('Error fetching submissions:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  