const questions = [
  {
    id: 1,
    question: "JavaScript is a ___ -side programming language.",
    options: ["Client", "Server", "Both"],
  },
  {
    id: 2,
    question: "What does ... operator do in JavaScript?",
    options: [
      "It is used to spread iterables to individual elements.",
      "It is used to describe a datatype of undefined size",
      "No such operator exists",
    ],
  },
  {
    id: 3,
    question:
      "When an operator value is NULL, the typeof returned by the unary operator is:",
    options: ["Boolean", "Undefined", "Object"],
  },
  {
    id: 4,
    question: "What does the toString() method return?",
    options: ["Return Object", "Return String", "Return Integer"],
  },
  {
    id: 5,
    question:
      "Which function is used to serialize an object into a JSON string?",
    options: ["stringify()", "parse()", "convert()"],
  },
  {
    id: 6,
    question:
      "What of the following is used in React.js to increase performance?",
    options: ["Original DOM", "Virtual DOM            ", "Both"],
  },
  {
    id: 7,
    question:
      "Which of the following acts as the input of a class-based component?        ",
    options: ["Factory", "Render", "Props"],
  },
  {
    id: 8,
    question: "What is the default port where webpack-server runs?        ",
    options: ["3000", "8080", "3030"],
  },
  {
    id: 9,
    question:
      "What is the declarative way to render a dynamic list of components based on values in an array?",
    options: [
      "Using the reduce array method",
      "Using the <Each /> component",
      "Using the Array.map() method",
    ],
  },
  {
    id: 10,
    question: "What is a state in React?",
    options: [
      "Internal storage of the component.",
      "A permanent storage.",
      "External storage of the component.",
    ],
  },
  {
    id: 11,
    question: "_____ is an interactive shell that processes Node.",
    options: ["REPL", "REAL", "RESP"],
  },
  {
    id: 12,
    question: "How can we install the node body-parser module?        ",
    options: [
      "node install body-parser",
      "node.js install body-parser",
      "npm install body-parser",
    ],
  },
  {
    id: 13,
    question:
      "To include the HTTP server in the node module, what function do we use?        ",
    options: ["get()", "require()", "createServer()"],
  },
  {
    id: 14,
    question: "Default scope in Node.js application is?        ",
    options: ["Global", "Local", "Local to Object"],
  },
  {
    id: 15,
    question: "____ is a debugging tool for NodeJS?        ",
    options: ["REPL", "Node Console", "Node Inspector"],
  },
  {
    id: 16,
    question: "Point out the correct statement",
    options: [
      "MongoDB is column oriented database store.",
      "MongoDB is classified as a NoSQL database.",
      "MongoDB favours XML format more than JSON",
    ],
  },
  {
    id: 17,
    question: "Which of the following formats is supported by MongoDB?",
    options: ["SQL", "XML", "BSON"],
  },
  {
    id: 18,
    question:
      "MongoDB is a _________ database that provides high performance, high availability, and easy scalability.",
    options: ["document", "key value", "graph"],
  },
  {
    id: 19,
    question:
      "MongoDB scales horizontally using _________ for load balancing purpose.",
    options: ["Partitioning", "Sharding", "Replication"],
  },
  {
    id: 20,
    question: "Which of the following sorting is not supported by MongoDB?",
    options: ["collation", "heap", "collection"],
  },
];

const answers = [2, 0, 2, 1, 0, 1, 2, 1, 2, 0, 0, 2, 1, 1, 2, 1, 2, 0, 1, 0];
module.exports = { questions, answers };
