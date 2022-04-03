const LikeBlogModel = require("../../models/LikeBlogModel/LikeBlogModel");
const router = require("express").Router();

router.post("/like/blog", async (req, res) => {
  const response = await LikeBlogModel.create(req.body);
  try {
    res.json(response);
  } catch (error) {
    res.json(500).json(error);
  }
});

router.delete("/like/blog", async (req, res) => {
  try {
    const response = await LikeBlogModel.deleteOne({
      $and: [
        {
          $email: { $eq: req.body.email },
        },
        {
          $blogId: { $eq: req.body.$blogId },
        },
      ],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/like/blog/:blogId", async (req, res) => {
  try {
    const response = await LikeBlogModel.find({ blogId: req.params.blogId });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/like/blog/byuser/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const response = await LikeBlogModel.find({ email: email }).select(
      "blogId"
    );
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
