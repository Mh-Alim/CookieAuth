import express from "express";
import cookieParser from "cookie-parser";
import jwt, { JwtPayload } from "jsonwebtoken";
import cors from "cors";

const JWT_SECRET = "XYZ";
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  // do db call and get id
  const token = await jwt.sign(
    {
      id: 1,
    },
    JWT_SECRET
  );

  res.cookie("token", token);
  res.json({
    message: "Logged in Successful",
  });
});

app.get("/user", async (req, res) => {
  try {
    console.log(req.cookies);
    const decod = (await jwt.verify(
      req.cookies.token,
      JWT_SECRET
    )) as JwtPayload;
    res.json({
      id: decod.id,
    });
  } catch (e: any) {
    console.log("Error is: ", e.message);
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Logout Successful",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
