const router = require('express').Router();

router.get('/', (req, res) => {
    // res.send('Hello World')
    res.json({ message: 'Hello World' })
}) 

module.exports = router;
 