function start() {

    let currentX = 0;
    let currentY = 0;
    let gridXLength = 0;
    let gridYLength = 0;
    let directions = [];
    let dirtPatches = [];
    let cleanDirtPatches = [];

    handleStart();

    function handleStart() {
        $('button').on('click', function(event) {
            fetch('input.txt')
                .then(response => response.text())
                .then(text => parseInput(text));
        })
    }

    function parseInput(text) {
        let result = text.split('\n');
        gridXLength = parseInt(result[0][0]);
        gridYLength = parseInt(result[0][2]);
        currentX = parseInt(result[1][0]);
        currentY = parseInt(result[1][2]);
        directions = result[result.length - 1];
        for (let i = 2; i < result.length - 1; i++) {
            dirtPatches.push(result[i]);
        }
        runDirections(directions);
    }

    function runDirections(directions) {
        for (let i = 0; i < directions.length; i++) {
            updateLocation(directions[i], currentX, currentY);
        }
        outputResults();
    }

    function updateLocation(direction, x, y) {
        if (direction === 'N' && y < gridYLength) {
            currentY++;
            checkForDirt(currentX, currentY);
        } else if (direction === 'S' && currentY > 0) {
            currentY--;
            checkForDirt(currentX, currentY);
        } else if (direction === 'E' && currentX < gridXLength) {
            currentX++;
            checkForDirt(currentX, currentY);
        } else if (currentX > 0) {
            currentX--;
            checkForDirt(currentX, currentY);
        }
    }

    function checkForDirt(currentX, currentY) {
        for (let i = 0; i < dirtPatches.length; i++) {
            if (currentX === parseInt(dirtPatches[i][0]) && currentY === parseInt(dirtPatches[i][2])) {
                let tempArr = [dirtPatches[i][0], dirtPatches[i][2]];
                cleanDirtPatches.push(tempArr);
            }
        }
    }

    function outputResults() {
        let finalCleanPatches = _.uniqWith(cleanDirtPatches, _.isEqual);
        console.log(`${currentX} ${currentY}`);
        console.log(`${finalCleanPatches.length}`);
        $('.final-location').text(`Final Location: ${currentX} ${currentY}`);
        $('.patches-cleaned').text(`Total Dirt Patches Cleaned: ${finalCleanPatches.length}`);
    }
}

$(start);