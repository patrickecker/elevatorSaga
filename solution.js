{
    init: function(elevators, floors) {
        elevators.forEach((elevator) => { // change to handle more than one elevator
          elevator.on("idle", function() {
              //send elevator to the bottom when not in use;
              elevator.goToFloor(0);
          });

          elevator.on("floor_button_pressed", function(floorNum) {
              // Maybe tell the elevator to go to that floor?
              elevator.goToFloor(floorNum);
          });
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
