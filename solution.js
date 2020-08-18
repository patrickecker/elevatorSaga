{
    init: function(elevators, floors) {
        elevators.forEach((elevator) => { // change to handle more than one elevator
              elevator.on("idle", function() {
                // if not moving, check if there are any floor buttons pressed
                floors.forEach((floor) =>{
                    if (floor.upButtonPressed) {
                      console.log(floor.floorNum(),"up",floor.upButtonPressed);
                      elevator.goToFloor(floor.floorNum());
                    };

                    if (floor.downButtonPressed) {
                      console.log(floor.floorNum(),"down",floor.downButtonPressed);
                      elevator.goToFloor(floor.floorNum());
                    };
                });
            });

            elevator.on("floor_button_pressed", function(floorNum) {
                // if floor is not already in the elevator's destination queue, go to it
                if (elevator.destinationQueue.indexOf(floorNum) == -1 ) {
                    elevator.goToFloor(floorNum);
                }
            });

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

        // flag each floor as to which buttons are pressed
        floors.forEach((floor) => {
            floor.upButtonPressed = false;
            floor.downButtonPressed = false;

            floor.on("up_button_pressed", function() {
                floor.upButtonPressed = true;
            });

            floor.on("down_button_pressed", function() {
                floor.downButtonPressed = true;
            });
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
