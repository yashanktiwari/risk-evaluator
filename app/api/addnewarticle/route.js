import { connectDB } from "@/utils/database"
import Article from "@/model/article"

export const POST = async (req, res) => {
  try {
    await connectDB();
    
    const body = await req.json();
    const newArticle = new Article({ title: body.title, content: body.content });
    
    console.log(body);
    
    await newArticle.save();

    return new Response("New article added successfully");
  } catch (error) {
    console.log(error);
    return new Response("Error occurred");
  }
}