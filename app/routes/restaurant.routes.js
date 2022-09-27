module.exports = app => {
    const restaurantItems = require("../controllers/restaurant.controller.js");
    var router = require("express").Router();
 
    router.post("/", restaurantItems.create);
 
    router.get("/", restaurantItems.findAll);

    router.get("/availiable", restaurantItems.findAllAvailiabilty);
 
    router.get("/:id", restaurantItems.findOne);

    router.put("/:id", restaurantItems.update);

    router.delete("/:id", restaurantItems.delete);

    router.delete("/", restaurantItems.deleteAll);
    app.use('/api/restaurantitems', router);
  };