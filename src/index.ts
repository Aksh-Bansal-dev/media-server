import express from "express";
import cors from "cors";
import routes from "./routes";
import fileUpload from "express-fileupload";
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("", routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
