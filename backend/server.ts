import express from 'express';
import router from './routes';
import cors from 'cors';

const app = express();
app.use(cors({ origin: "http://localhost:5173"}))

app.use(express.json());
app.use("/api", router);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});