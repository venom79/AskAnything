import mongoose from "mongoose";

Database().then(()=>console.log("Database Connected")).catch(err => console.log(err));

export async function Database() {
  await mongoose.connect(process.env.MONGO_URI,{dbName:"AskAnything"});
}
