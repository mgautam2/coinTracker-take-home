const express = require('express');


const router = new express.Router();

// Routes
router.get("/test", function(req, res){
    const serverRunningMessage = {
        message: "Server is running"
    };

    res.send(serverRunningMessage);
})



module.exports = router;