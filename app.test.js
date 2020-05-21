// process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");

let tidbits = require('./fakeDb');

beforeEach(function() {
  tidbits.length = 0;
  tidbits.push("hello", "there");
});

describe("GET /tidbits", function() {
  it("Gets the array of tidbits", async function() {
    const response = await request(app).get('/tidbits');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({"tidbits": ["hello", "there"]})
  });
});

describe("POST /tidbits", function() {
  it("Prepends a string to the server's tidbits array", async function() {
    let response = await request(app).get('/tidbits');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({"tidbits": ["hello", "there"]})

    const tidbit = "hi";
    response = await request(app)
      .post('/tidbits')
      .send({
        "tidbit": tidbit
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ "tidbit": tidbit })

    response = await request(app).get('/tidbits');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({"tidbits": ["hi", "hello", "there"]})
  });

  it("Returns with a status 400 if request is not appropriate form",
    async function() {
      const tidbit = 5; // number, not a string
      response = await request(app)
        .post('/tidbits')
        .send({
          "tidbit": tidbit
        });
      expect(response.statusCode).toBe(400);
      expect(response.error.text).toEqual(
        'Expecting request body to be { "tidbit": /string/ }'
      );
  });
})
