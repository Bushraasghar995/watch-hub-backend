import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Tumhari converted string jo ziddi internet par bhi chal jati hai
const MONGO_URI = "mongodb://BushraAsghar:jTVmLSlb8IHgMxmL@cluster0-shard-00-00.3juzfig.mongodb.net:27017,cluster0-shard-00-01.3juzfig.mongodb.net:27017,cluster0-shard-00-02.3juzfig.mongodb.net:27017/BushraAsghar_WatchHub?ssl=true&replicaSet=atlas-3juzfig-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
.then(() => {
  console.log("💎 MongoDB Connected Successfully to Atlas!");

  app.listen(5000, () => {
    console.log("🚀 Server is running on port 5000");
  });
})
.catch((err) => {
  console.error("❌ Connection error:", err);
});

app.get("/", (req, res) => {
  res.send("Watch Hub Backend Running Successfully 🚀");
});