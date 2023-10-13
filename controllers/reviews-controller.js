const { Review } = require("../models/schemas/review");
const { HttpsError } = require("../helpers");
const {ctrlWrapper} = require("../decorators")

const getAllReviews = async (req, res) => {
    const result = await Review.find();
    res.json(result);
}

const getOwnReview = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Review.find({ owner } );
    if (!result) {
        throw HttpsError(404, "Not found");
    }
    res.json(result);
}

const addReview = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Review.create({...req.body, owner});
    res.status(201).json(result);
}

const updateReview = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Review.findOneAndUpdate({owner} , req.body, { new: true });
    if (!result) {
        throw HttpsError(404, "Not found");
    }
    res.json(result);
}

const deleteReview = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Review.findOneAndDelete({ owner });
    if (!result) {
        throw HttpsError(404, "Not found");
    }
    res.json({
        message: "Delete success"
    })
}

module.exports = {
    getAllReviews: ctrlWrapper(getAllReviews),
    getOwnReview: ctrlWrapper(getOwnReview),
    addReview: ctrlWrapper(addReview),
    updateReview: ctrlWrapper(updateReview),
    deleteReview: ctrlWrapper(deleteReview),
}