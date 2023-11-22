const express = require("express");
const path = require("path");
const app = express();
const puerto = 3000;
const mongoose = require("mongoose");
const Libro = require("./modulos/Libro");
const { ApolloServer, gql } = require('apollo-server-express');
const Biblioteca = require("./modulos/Biblioteca");

const uri = "mongodb://eifes:123456@127.0.0.1:27017/test";

// Agregamos el middleware para que podamos hacer uso
// de archivos estaticos que se encuentran en el directorio public
app.use(express.static('public', { index : false }));

// Agregamos el middleware para que revise las request
// y si vienen con parametros en formato json las pueda procesar
app.use(express.json());

// Agregamos el middleware para que revise las request
// y si vienen con parametros en formato x-www-form-data-urlencoded las pueda procesar
app.use(express.urlencoded());

app.get("/*", (req, res, next) => {

  if(req.url === "/graphql") {
    return next();
  }

  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    libros : [Libro]
    bibliotecas : [Biblioteca]
  }

  type Libro {
    _id : String
    nombre : String
    descripcion : String
    fechaIngreso : String
    genero : String
  }

  type Biblioteca {
    _id : String
    nombre : String
    correoElectronico : String
    ciudad : String
    cp : String
    direccion : String
  }

  type Mutation {
    agregarLibro(input : LibroInput) : Libro
    agregarBiblioteca(input : BibliotecaInput) : Biblioteca
  }

  input LibroInput {
    nombre : String
    descripcion : String
    fechaIngreso : String
    genero : String
  }

  input BibliotecaInput {
    nombre : String
    correoElectronico : String
    ciudad : String
    cp : String
    direccion : String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    libros : async () => {
        return await Libro.find();
    },
    bibliotecas : async () => {
      return await Biblioteca.find();
  }
  },
  Mutation: {
    agregarLibro : async (_,{ input }, contextValue, info) => {

      const nuevoLibro = new Libro(input);
      await nuevoLibro.save();
      return nuevoLibro;
    },
    agregarBiblioteca : async (_,{ input }, contextValue, info) => {

      const nuevaBiblioteca = new Biblioteca(input);
      await nuevaBiblioteca.save();
      return nuevaBiblioteca;
  }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() =>{

    server.applyMiddleware({ app });
    app.listen(puerto, async () =>{
        console.info(`El servidor Express ya esta escuchando en http://localhost:${puerto}`);

        mongoose.connect(uri)
        .then(() => console.info("Conexión a MongoDB establecida"))
        .catch(err => console.error("Ocurrió un error al conectarnos: ", err))
    });
});
