const assert = require("assert");
const ganche = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;
const initialMessage = "Hello world.";

const web3 = new Web3(ganche.provider());

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  //Use one account to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [initialMessage] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox Contract", () => {
  it("Deploys a contract", () => {
    assert.ok(inbox.options.address);
  });
  it("Default message assigned", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, initialMessage);
  });
  it("Message successfully changed", async () => {
    const newMessage = "Changed for test";
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, newMessage);
  });
});

// class Car {
//   park() {
//     return "stopped";
//   }

//   drive() {
//     return "vroom";
//   }
// }

// let car;

// beforeEach(() => {
//   console.log("Testing");
//   car = new Car();
// });

// describe("Car", () => {
//   it("can park", () => {
//     assert.equal(car.park(), "stopped");
//   });
//   it("can drive", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });
