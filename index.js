import express from "express";
import data from "./data/mock.json" assert { type: "json" };

const app = express();
const PORT = 3000;

//Using the Public folder at the root of the project
app.use(express.static("public"));

//Using the images folder at the route /images
app.use("/images", express.static("images"));

//GET
app.get("/", (request, response) => {
  response.json(data);
});

//POST
app.post("/create", (request, response) => {
  response.send("This is a POST request  to /create");
});

// PUT
app.put("/edit", (request, response) => {
  response.send("This is a PUT request  to /edit");
});

// DELETE
app.delete("/delete", (request, response) => {
  response.send("This is a DELETE request  to /delete");
});

app.listen(PORT, () => {
  console.log(data);
  console.log(`The server is running on PORT: ${PORT}`);
});
