import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import BooksRoute from "./routes/booksRoutes.js";
import cors from "cors";
const app = express();

// Middleware for parsing request body
app.use(express.json());

//middleware for handling CORS POLICY
//Option 1: allow all Origins with Default of cors(*)
app.use(cors());

//Option 2: allow Custom Origins
// app.use(
//   cors({
//     origin: "http:localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack Tutorial");
});

app.use("/books", BooksRoute);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App connected to database`);
    app.listen(PORT, () => {
      console.log(`app is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
