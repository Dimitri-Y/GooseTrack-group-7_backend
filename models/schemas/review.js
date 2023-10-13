const {Schema, model} = require("mongoose");
const Joi = require("joi");
const { handleSaveError } = require("../hooks");
const reviewSchema = new Schema( {
name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
comment: {
    type: String,
  },
owner:{ 
    type: Schema.Types.ObjectId,
    ref: "user",
  },
}, { versionKey: false, timestamps: true });

reviewSchema.post("save", handleSaveError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  comment: Joi.string().required(),
});

const changeSchema = Joi.object({
  name: Joi.string(),
  comment: Joi.string(),
}).or('name', 'comment');



const schemas = {
    addSchema,
    changeSchema,
    
}

const Review = model("review", reviewSchema);

module.exports = {
    Review,
    schemas,
}