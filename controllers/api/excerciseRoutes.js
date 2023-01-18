const router = require('express').Router();
const fetch = require('node-fetch');
const withAuth = require('../../utils/auth');

// This will gather the exercises from the Ninja API
router.get('/:url', withAuth, async (req, res) => {
    try {
        let response = await fetch(`https://api.api-ninjas.com/v1/exercises?${req.params.url}`, {
            headers: {
                'X-Api-Key': process.env.API_Key
            }
        });
        let data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


module.exports = router;