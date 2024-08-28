import express, { response } from "express";
import data from "./data/mock.json" assert { type: "json" };

const app = express();
const PORT = 3000;

//Using the Public folder at the root of the project
app.use(express.static("public"));

//Using the images folder at the route /images
app.use("/images", express.static("images"));

// Using express.json and express.urlencoded
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET - redirect method
app.get("/redirect", (request, response) => {
  response.redirect("https://www.linkedin.com/in/wajud-kareem-92537115a/");
});

app
  .route("/class")
  .get((request, response) => {
    // response.send("Retrieve class info");
    throw new Error();
  })
  .post((request, response) => {
    response.send("Create class info");
  })
  .put((request, response) => {
    response.send("Edited");
  });

//GET
app.get("/", (request, response) => {
  response.json(data);
});

// POST - express.json and express.urlencoded
app.post("/item", (request, response) => {
  console.log(request.body);
  response.send(request.body);
});

//GET with next()
app.get(
  "/tonext",
  (request, response, next) => {
    console.log("The response will be sent by the next function");
    next();
  },
  (request, response) => {
    response.send("I just set up a route with a second callback");
  }
);

//GET with routing parameters
app.get("/class/:studentId", (request, response) => {
  const studentId = Number(request.params.studentId);
  const student = data.filter((student) => student.id === studentId);
  response.send(student);
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

app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).send("Something is broken!");
});

app.listen(PORT, () => {
  // console.log(data);
  console.log(`The server is running on PORT: ${PORT}`);
});
