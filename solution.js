{
    init: function(elevators, floors) {
        elevators.forEach((elevator) => { // change to handle more than one elevator
          elevator.on("idle", function() {
              //send elevator to the bottom when not in use;
              elevator.goToFloor(0);
          });

          elevator.on("floor_button_pressed", function(floorNum) {
              // if floor is not already in the elevator's destination queue, go to it
              if (elevator.destinationQueue.indexOf(floorNum) == -1) {
                  elevator.goToFloor(floorNum);
              }
          })

          elevator.on("passing_floor", function(floorNum, direction) {
              // check to see if floorNum is in the destinationQueue
              if (elevator.destinationQueue.indexOf(floorNum) != -1) {
                  var index = elevator.destinationQueue.indexOf(floorNum);
                  elevator.destinationQueue.splice(index, 1);
                  elevator.goToFloor(floorNum, true);
              }
          });

          elevator.on("stopped_at_floor", function(floorNum) {
              // set the car's direction indicators for passengers
              if (floorNum == 0) {
                  elevator.goingUpIndicator(true);
                  elevator.goingDownIndicator(false);
                  currentDirection = "up";
              } else if (floorNum == (floors.length - 1)) {
                  elevator.goingUpIndicator(false);
                  elevator.goingDownIndicator(true);
                  currentDirection = "down";
              } else {
                  elevator.goingUpIndicator(true);
                  elevator.goingDownIndicator(true);
              };
          });
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
