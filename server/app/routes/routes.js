module.exports = app => {
    const events = require("../controllers/event.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Events
    router.post("/", events.create);
  
    // Retrieve all events
    router.get("/", events.findAll);
  
    // Retrieve all events with specific category
    router.get("/byCategory", events.findAllByCategory);
  
    // Retrieve a single Events with id
    router.get("/:id", events.findOne);
  
    // Update a Events with id
    router.put("/:id", events.update);
  
    // Delete a Events with id
    router.delete("/:id", events.delete);
  
    // Create a new Events
    router.delete("/", events.deleteAll);
  
    app.use('/api/events', router);
  };