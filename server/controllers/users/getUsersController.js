import { createClient } from "@supabase/supabase-js";
import Users from "../../models/user.js";

const supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function getUsersController(req, res){
    const users = await Users.find({}, {password: 0});
    res.json(users);
}