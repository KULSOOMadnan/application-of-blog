import mongoose from "mongoose";

const connecttoBD =  async () => {
  const connectUrl =
    "mongodb+srv://kulsoomAdnan:Wasyi@cluster0.pmd5g.mongodb.net/";
  mongoose
    .connect(connectUrl)
    .then(() => console.log("Data Base in CONNECTED Successfully"))
    .catch((e) => console.log(e));
};


export default connecttoBD