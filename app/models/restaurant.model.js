module.exports = mongoose => {
    var schema = mongoose.Schema({
        title:String,
        description: String,
        image :String,
        price: String,
        availability: Boolean,
    
    },
    {timestamps : true}
    );

    schema.method("toJSON",function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    //object.version = __v;
    return object;
    })

    const restaurantItem = mongoose.model("restaurantItem",schema);
    return restaurantItem;
};