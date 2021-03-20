const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function(){
    let defaults = new Rover(123456);
    expect(defaults.position).toEqual(123456,'NORMAL',110);
  });
  it("response returned by receiveMessage contains name of message", function(){
    let command = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('This is a test message', command);
    let test = new Rover(123456);
    expect(test.receiveMessage(message).message).toEqual('This is a test message');
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('There are 2 commands', commands);
    let rover = new Rover(123456);
    let response = rover.receiveMessage(message).results;
    expect(response.length).toEqual(2);
  });
  it("responds correctly to status check command", function(){
    let command = [new Command('STATUS_CHECK')];
    let message = new Message('Test message', command);
    let rover = new Rover(123456);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{completed:true, roverStatus:{mode: 'NORMAL', generatorWatts:110, position: 123456}}]);
  });
  it("responds correctly to mode change command", function(){
    let command = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MODE_CHANGE', 'LOW_POWER'),new Command('STATUS_CHECK')];
    let message = new Message('This is a test message', command);
    let rover = new Rover(123456);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{completed:true}, {completed:true}, {completed:true, roverStatus:{mode: 'LOW_POWER', generatorWatts:110, position: 123456}}]);
  });
  it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    let command = [new Command('MODE_CHANGE', 'LOW_POWER'),new Command('MOVE', 7896),new Command('STATUS_CHECK')];
    let message = new Message('This is a test message', command);
    let rover = new Rover(123456);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{completed:true}, {completed:false}, {completed:true, roverStatus:{mode:'LOW_POWER', generatorWatts:110, position:123456}}]);
  });
  it("responds with position for move command", function(){
    let command = [new Command('MODE_CHANGE', 'NORMAL'),new Command('MOVE', 7896),new Command('STATUS_CHECK')];
    let message = new Message('This is a test message', command);
    let rover = new Rover(123456);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{completed:true}, {completed:true}, {completed:true, roverStatus:{mode:'NORMAL', generatorWatts:110, position:7896}}]);
  });

});
