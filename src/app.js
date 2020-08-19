const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO Data Validation
  const {title,url,techs} = request.body;
  const repositorie = {id: uuid(), title, url, techs, likes: 0};
  repositories.push(repositorie);
  return response.status(201).json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id == id);
  if(repoIndex < 0){
    return response.status(400).json({error : "Repositorie not found"})
  }
  const {likes} = repositories[repoIndex]
  const {title, url, techs} = request.body;
  const repo = {id, url, title, techs, likes};
  repositories[repoIndex] = repo;
  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
