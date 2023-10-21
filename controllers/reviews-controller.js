import { Review } from "../models/schemas/review.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpsError from "../helpers/httpError.js";

const getAllReviews = async (req, res) => {
  const result = await Review.find();
  res.json(result);
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
  const result = await Review.find({ owner });
  if (!result) {
    throw HttpsError(404, "Not found");
  }
  /* #swagger.tags = ['Reviews'] 
  #swagger.description ='Get all reviews for user'
  } */
  /* #swagger.responses[200] = {
     description: 'Get successful',
     schema: { $ref: '#definitions/reviews' }
 } */
  res.json(result);
};

const addReview = async (req, res) => {
  const owner = req._id;
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
  const owner = req._id;
  const result = await Review.findOneAndUpdate( owner, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpsError(404, "Not found");
  }
  res.json(result);
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
  const reviewId = req._id;
  const result = await Review.findOneAndDelete(reviewId);
  if (!result) {
    throw HttpsError(404, "Not found");
  }
  res.json({
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
