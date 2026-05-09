import Blog from "../models/Blog.js";
import OpenAI from "openai";

// 🧠 GENERATE BLOG CONTENT using AI
import axios from "axios";

export const generateBlog = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/gpt2",
        {
          inputs: `Write a detailed blog about ${topic}`,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
          },
        }
      );

      const content =
        response.data?.[0]?.generated_text || "No response generated";

      return res.json({
        success: true,
        content,
      });
    } catch (hfError) {
      console.error("HuggingFace API Error:", hfError.message);
      
      // Fallback: Generate a simple blog template
      const fallbackContent = `# ${topic}

## Introduction
${topic} is an important subject in today's world. This article explores the key aspects and implications of ${topic}.

## Main Points
- **Point 1**: Understanding the fundamentals of ${topic}
- **Point 2**: Current trends and developments in ${topic}
- **Point 3**: Future implications of ${topic}

## Benefits
${topic} offers several benefits and advantages that make it worth exploring:
1. Enhanced knowledge and understanding
2. Practical applications in everyday life
3. Career opportunities and growth

## Challenges
While ${topic} is beneficial, it also comes with challenges:
1. Complexity in implementation
2. Need for continuous learning
3. Adapting to rapid changes

## Conclusion
In conclusion, ${topic} plays a vital role in shaping our future. Understanding and engaging with ${topic} is essential for personal and professional growth.

## References
- Further reading available on ${topic}
- Explore more insights on related topics`;

      return res.json({
        success: true,
        content: fallbackContent,
      });
    }
  } catch (error) {
    console.error("Generate Blog Error:", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};
// ======================================
// 📝 CREATE BLOG
// ======================================
export const createBlog = async (req, res) => {
  try {
    const { title, topic, content } = req.body;

    if (!title || !topic || !content) {
      return res.status(400).json({
        message: "Title, topic and content are required",
      });
    }

    const blog = await Blog.create({
      title,
      topic,
      content,
      user: req.userId,
    });

    res.json({
      success: true,
      blog,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================================
// 🟢 GET ALL BLOGS (USER SPECIFIC)
// ======================================
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      blogs,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================================
// 🟢 GET SINGLE BLOG
// ======================================
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.user.toString() !== req.userId) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({
      success: true,
      blog,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================================
// ✏️ UPDATE BLOG
// ======================================
export const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.user.toString() !== req.userId) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (title) blog.title = title;
    if (content) blog.content = content;

    await blog.save();

    res.json({
      success: true,
      blog,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================================
// 🗑️ DELETE BLOG
// ======================================
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.user.toString() !== req.userId) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};