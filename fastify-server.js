//Name: Brad Walther

const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
  ];

// Require the Fastify framework and instantiate it
const fastify = require("fastify")();
// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax

//Student Route
fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});

//Student ID route
fastify.get("/cit/student/:id", (request, reply) => {
    //Obtain ID
    let studentIdFromClient = request.params.id;
    //Do something with ID
    let studentToGiveClient = null;
    for (studentFromArray of students) {
        if (studentFromArray.id == studentIdFromClient) {
            studentToGiveClient = studentFromArray;
            break;
        }
    }

    //Provide a response
    if (studentToGiveClient != null) {
        reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(studentToGiveClient);
    }
    else {
        reply
        .code(404)
        .header("Content-Type", "text/html; charset=utf-8")
        .send("Could not find student with given ID");
    }
  });

//An undefined/wildcard route
fastify.get("*", (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("<h1>Wildcard Route</h1>");
  });

//Post route
fastify.post("/cit/students/add", (request, reply) => {
    //Get request from client
    let dataFromClient = JSON.parse(request.body);

    let maxID = 0
    for (individualStudent of students) {
        if (maxID < individualStudent.id) {
            maxID = individualStudent.id;
        } 
    }

    let generatedStudent = 
      {
        id: maxID + 1,
        last: dataFromClient.lname,
        first: dataFromClient.fname
      };
      
    //Add student to object
    students.push(generatedStudent);


    //Reply to client
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(generatedStudent);
});

  
// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});