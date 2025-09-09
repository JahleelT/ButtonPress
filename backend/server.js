import express from 'express';
import router from './routes/index.js';
import cors from 'cors';

const app = express();
app.use(cors({ 
  origin: [
    "http://localhost:5173",
    "https://buttonpress-2dc06.web.app"
  ],
  credentials: true,
}));

app.use(express.json());
app.use("/api", router);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});