const commentBlogModel = require("../../models/commentBlogModel/commentBlogModel");
const router = require("express").Router();

router.post("/comment/:blogId", async (req, res) => {
  const { blogId } = req.params;
  const { email, image, comment, dateOfComment } = req.body;
  try {
    const response = await commentBlogModel.create({
      blogId,
      email,
      image,
      comment,
      dateOfComment,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/comments/all/:blogId", async (req, res) => {
  const { blogId } = req.params;
  console.log(blogId);
  try {
    const response = await commentBlogModel
      .find({ blogId: blogId })
      .sort({ dateOfComment: -1 });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
