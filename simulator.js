function rollFive(guarantee) {
    if (guarantee) {
        return false;
    } else {
        return Math.random() < 0.5 ? Math.random() >= 0.125 : false;
    }
}

function warpSim(copies) {
    const percentages = [...]; // Use original percentages array
    const fpercentages = [...]; // Use original fpercentages array
    
    let pity = 0, guarantee = false, current = 0, count = 0, fpity = 0, glitter = 0;
    
    while (current < copies) {
        let roll = Math.random();
        if (roll < percentages[pity]) {
            if (!rollFive(guarantee)) {
                current++;
                guarantee = false;
            } else {
                guarantee = true;
            }
            pity = 0;
        } else {
            pity++;
            if (roll < percentages[pity] + fpercentages[fpity]) {
                fpity = 0;
                glitter += Math.random() > 0.5 ? 20 : 8;
            } else {
                fpity++;
            }
        }
        count++;
    }
    return { count, glitter };
}

function runSimulation() {
    let copies = parseInt(document.getElementById("copies").value);
    if (isNaN(copies) || copies <= 0) {
        alert("Please enter a valid number of copies.");
        return;
    }
    
    let totalWarps = [], totalGlitter = [];
    for (let i = 0; i < 1000; i++) {
        let { count, glitter } = warpSim(copies);
        totalWarps.push(count);
        totalGlitter.push(glitter);
    }
    
    let mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    let median = arr => {
        arr.sort((a, b) => a - b);
        let mid = Math.floor(arr.length / 2);
        return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
    };
    
    document.getElementById("results").innerHTML = `
        <p>Average Pulls: ${mean(totalWarps).toFixed(3)}</p>
        <p>Median Pulls: ${median(totalWarps)}</p>
        <p>Max Pulls: ${Math.max(...totalWarps)}</p>
        <p>Min Pulls: ${Math.min(...totalWarps)}</p>
        <p>Average Undying Starlight: ${mean(totalGlitter).toFixed(3)}</p>
        <p>Median Undying Starlight: ${median(totalGlitter)}</p>
    `;
}
