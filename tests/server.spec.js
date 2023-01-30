const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Obteniendo datos de cafes", async () => {
    const response = await request(server).get("/cafes").send();
    const body = response.body;
    const status = response.statusCode;
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBeGreaterThan(0);
  });
  it("Eliminando un producto con id inexistente", async () => {
    const jwt = "token";
    const idDeProductoAEliminar = "10";
    const response = await request(server)
      .delete(`/cafes/${idDeProductoAEliminar}`)
      .set("Authorization", jwt)
      .send(idDeProductoAEliminar);
    const status = response.statusCode;
    expect(status).toBe(404);
  });
  it("Enviando nuevo cafe", async () => {
    const id = Math.floor(Math.random() * 999);
    const cafe = { id, nombre: "Expresso" };
    const { body: cafes } = await request(server)
      .post("/cafes")
      .send(cafe);
    expect(cafes).toContainEqual(cafe);
  });
  it("Modificación de id sin coincidencias", async () => {
    const id = "7";
    const cafe= { id };
    const response = await request(server).put("/cafes/1").send(cafe);
    const status = response.statusCode;
    expect(status).toBe(400);
  });
});
