const db = require("../models");
const RestaurantItem = db.restaurantItems;

exports.create = (req, res) => {
  if(!req.body.title){
      res.status(400).send({Message : 'Title Cant be empty !!'})
      return;
  }

const restaurantItem = new RestaurantItem({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
    availability: req.body.availability ? req.body.availability : false
})

restaurantItem
.save(restaurantItem)
.then(data =>{
    res.send(data);
})
.catch(err =>{
    res.staus(500).send({message : err.message || "SOme problem occured during creating Restaurant Item"})
})
};

exports.findAll = (req, res) => {

  const title = req.query.title;
  const condition = title ? { title : { $regex: new RegExp(title), $options: "i" } } : {} 
  RestaurantItem.find(condition)
  .then(data =>{
      res.send(data);
  })
  .catch(err =>{
      res.status(500).send({message: err.message || "Error while retriving Data"})
  })


};

exports.findOne = (req, res) => {

    const id = req.params.id;

    RestaurantItem.findById(id)
    .then(data =>{
      //  console.log(data);
        if(!data){
            res.status(404).send({ message: "Not found Item with id " + id });
        }
        else{
            res.send(data);
        }
    })
    .catch(err =>{
        res.status(500).send({message : err.message || "Some Problem while retriving Data with id = "+id})
    })
  
};

exports.update = (req, res) => {
    const id = req.params.id;
  if(!req.body){
      res.status(400).send({message:" Please provide data to update"});
  }
  else{
      RestaurantItem.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
      .then(data =>{
          if(!data){
              res.status(404).send({message:"Data Not Found OR There is some problem while fetching data with id = ",id })
          }else{
          res.send({messaage : "Data is successfully updated."});
          }
      })
      .catch(err =>{
            res.status(500).send({message: err.message || "Some Error while updating data with id = "+id })
      })
  }

};

exports.delete = (req, res) => {
  const id  = req.params.id;
  RestaurantItem.findByIdAndRemove(id)
  .then(data => {
      if(!data){
          res.status(404).send({message : "Cannot delete foodItem Maybe foodItem was not found!"});
      }else{
          res.send({message : "Data successfully Deleted with id = "+id});
      }
  })
  .catch(err => {
      res.status(500).send({message : "Some error while deleting data with id = "+id});
  })
};

exports.deleteAll = (req, res) => {
  
    RestaurantItem.deleteMany()
    .then(data =>{
        res.send({message : `${data.deletedCount} records deleted successfully`});
    })
    .catch(err =>{
        res.status(500).send({message: err.messaage || " Soem error while deleting data"})
    })
};

exports.findAllAvailiabilty = (req, res) => {
  RestaurantItem.find({availability : true})
  .then(data=>{
      res.send(data);
  })
  .catch(err =>{
      res.staus(500).then({message : "Some error occurred while retrieving Restaurant Items"})
  })
};