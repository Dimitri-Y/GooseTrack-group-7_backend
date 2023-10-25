import { Review } from "../models/schemas/review.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpsError from "../helpers/httpError.js";

const getAllReviews = async (req, res) => {
  const result = await Review.find()
    .populate("owner", "userName avatarURL")
    .exec();
  res.status(200).json(result);
  /* #swagger.tags = ['Reviews']
  #swagger.description ='Get all reviews'
 } */
  /* #swagger.responses[200] = {
     description: 'Get successful',
     schema: { $ref: '#definitions/reviews' }
 } */
};

const getOwnReview = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Review.find({ owner })
  // .populate("owner", "_id userName")
  // .exec();
  if (!result) {
    throw HttpsError(404, "Not found");
  }

  res.status(200).json(result);
};

// const addReview = async (req, res) => {
//   const { _id: owner } = req.user;
//   const result = await Review.create({ ...req.body, owner });
//   res.status(201).json(result);
// }

const addReview = async (req, res) => {

  const { _id: owner } = req.user;
  
  // const { userName: name } = req.user;
  // const uname = req.user.userName
  // const id = req.user._id;
  // const { comment, raiting } = req.body;

  // const owner = { _id: id, userName: uname}

  const result = await Review.create({ ...req.body, owner });
  res.status(201).json(result);
  

  /* #swagger.tags = ['Reviews'] 
  #swagger.description =.parameters['addReview'] = {
   in: 'body',
   description: 'add new review',
   type: 'object',
   required: true,
   schema: { $ref: '#/definitions/addReview' }
 } */
  /* #swagger.responses[201] = {
     description: 'add new review successfully',
     schema: { $ref: '#/definitions/reviews' }
 } */
};
 
const updateReview = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Review.findOneAndUpdate({owner}, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpsError(404, "Not found");
  }
  res.status(200).json(result);
  /* #swagger.tags = ['Reviews'] 
  #swagger.parameters['id'] = {
   description: 'Existing review ID',
   type: 'string',
   required: true
 } */
  /* #swagger.description =.parameters['updateReview'] = {
   in: 'body',
   description: 'update review',
   type: 'object',
   required: true,
   schema: { $ref: '#/definitions/updateReview' }
 } */
  /* #swagger.responses[201] = {
     description: 'update review successfully',
     schema: { $ref: '#/definitions/reviews' }
 } */
};

const deleteReview = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Review.findOneAndDelete({ owner });
  if (!result) {
    throw HttpsError(404, "Not found");
  }
  res.status(200).json({
    message: "Delete success",
  });
};

export default {
  getAllReviews: ctrlWrapper(getAllReviews),
  getOwnReview: ctrlWrapper(getOwnReview),
  addReview: ctrlWrapper(addReview),
  updateReview: ctrlWrapper(updateReview),
  deleteReview: ctrlWrapper(deleteReview),
};
