class Rover {
   // Write code here!
   constructor(position){
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }
   receiveMessage(message){
    let objectReturned = {message:message.name};
    objectReturned.results = [];
    for (let i=0; i<message.commands.length;i++){
      if(message.commands[i].commandType ==='MODE_CHANGE'){
         if (message.commands[i].value === 'NORMAL'){
           this.mode = 'NORMAL';
           objectReturned.results.push({completed:true});
         } else if (message.commands[i].value === 'LOW_POWER'){
           this.mode = 'LOW_POWER';
           objectReturned.results.push({completed:true});
         } 
      } else if (message.commands[i].commandType === 'MOVE'){
        if (this.mode !== 'LOW_POWER'){
          this.position = message.commands[i].value;
          objectReturned.results.push({completed:true});
        } else {
          this.position = this.position;
          objectReturned.results.push({completed:false});
        }
      } else if (message.commands[i].commandType === 'STATUS_CHECK'){
        let roverStatus = {'mode': this.mode, 'generatorWatts': this.generatorWatts, 'position': this.position};
        let specialStatus = {completed:true, roverStatus : {'mode': this.mode, 'generatorWatts': this.generatorWatts, 'position': this.position}};
        objectReturned.results.push(specialStatus);
      } else {
        objectReturned.results.push({completed:false});
      }
    };
    return objectReturned;      
  }
}

module.exports = Rover;