const router = require('express').Router();
const openaiRoutes = require('./openai');
router.use('/', openaiRoutes); 
module.exports = router;
 