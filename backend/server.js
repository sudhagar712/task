const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./lib/db");
const cors = require("cors")
const taskRoutes = require("./routes/taskRoutes");

dotenv.config(); 
const app = express();

connectDB();

app.use(express.json()); 

// ..................................................sample.....................................................
app.get("/", (req, res) => {
  res.json({ msg: "Hello Sudhagar!" });
});

// .................................................api.....................................................
app.use("/api/tasks", taskRoutes);

//................................................. Port.....................................................
const PORT = process.env.PORT || 8000;

// ..............................................Start Server............................................
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
