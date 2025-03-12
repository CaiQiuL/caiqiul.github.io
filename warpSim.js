function rollFive(guarantee) {
    if (guarantee) return false;  // Guaranteed rate-up
    return Math.random() < 0.5 && Math.random() >= 0.125;
}

function warpSim(copies) {
    let pity = 0, guarantee = false, current = 0, count = 0;

    while (current < copies) {
        let roll = Math.random();  // Random number from (0,1]

        if (pity >= 80 || roll < 0.006) {
            if (!rollFive(guarantee)) {
                current++;
                guarantee = false;
            } else {
                guarantee = true;
            }
            pity = 0;  // Reset pity after getting a 5-star
        }

        count++;
        pity++;
    }
    return count;
}

function runSimulation() {
    let copies = parseInt(document.getElementById("copies").value);
    let totalWarps = [];

    for (let i = 0; i < 1000; i++) {
        totalWarps.push(warpSim(copies));
    }

    let mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    let median = arr => {
        arr.sort((a, b) => a - b);
        let mid = Math.floor(arr.length / 2);
        return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
    };

    document.getElementById("results").innerHTML = `
        <strong>After 1000 simulations for ${copies} copies:</strong><br>
        Mean pulls: ${mean(totalWarps).toFixed(2)}<br>
        Median pulls: ${median(totalWarps)}<br>
        Max pulls: ${Math.max(...totalWarps)}<br>
        Min pulls: ${Math.min(...totalWarps)}
    `;
}
