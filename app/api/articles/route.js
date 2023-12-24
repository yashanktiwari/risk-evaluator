import { connectDB } from "@/utils/database"
import Article from "@/model/article"

export const GET = async (req, res) => {
  try {
    connectDB();

    const articles = await Article.find();

    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error occured", { status: 500 });
  }
}