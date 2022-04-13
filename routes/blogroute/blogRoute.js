const router = require("express").Router();
const BlogModel = require("../../models/blogModel/BlogModel");

router.post("/blog", async (req, res) => {
  const { title, description } = req.body;

  if (title !== "" || description !== "") {
    try {
      const response = await BlogModel.create({ title, description });
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    console.log("please Enter Some Thing");
  }
});

router.get("/blog", async (req, res) => {
  try {
    const response = await BlogModel.find({}).sort({ dateOfUpload: -1 });
    res.status(200).json(response);
  } catch (error) {
    res.json(error);
  }
});

router.get("/blog/:blogId", async (req, res) => {
  try {
    const response = await BlogModel.findOne({ _id: req.params.blogId });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/blog/:blogId", async (req, res) => {
  const { blogId } = req.params;
  try {
    const response = await BlogModel.findOneAndDelete({ _id: blogId });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
