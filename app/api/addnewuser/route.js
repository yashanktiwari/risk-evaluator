import { connectDB } from "@/utils/database"
import User from "@model/user";

export const POST = async (req, res) => {
  try {
    await connectDB();

    const body = req.json();
    const newUser = new User({
      email: body.email,
      zipcode: body.zipcode
    });

    await newUser.save();

    return new Response("New user added successfully");
  } catch (error) {
    console.log(error);
    return new Response("Error occurred");
  }
}