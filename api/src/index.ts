import bodyParser from "body-parser";
import cors from "cors";
import app from "./database/connection";

app.use(bodyParser.json());
app.use(cors());