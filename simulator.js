function rollFive(guarantee) {
    if (guarantee) {
        return false;
    } else {
        if (Math.random() < 0.5) {
            return Math.random() >= 0.125;
        } else {
            return false;
        }
    }
}

function warpSim(copies) {
    const percentages = [
        0.0081, 0.0079, 0.0083, 0.0078, 0.0085, 0.0084, 0.0084, 0.0081, 0.0082, 0.0086, 
        0.0082, 0.0085, 0.0088, 0.0078, 0.0077, 0.0083, 0.0084, 0.0081, 0.0077, 0.0078, 
        0.0081, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 
        0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 
        0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 
        0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 
        0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 
        0.0075, 0.0075, 0.0075, 0.0075, 0.0075, 0.0634, 0.1264, 0.1814, 0.2373, 0.2973, 
        0.3603, 0.4142, 0.4637, 0.5304, 0.5706, 0.5863, 0.5911, 0.4219, 0.2297, 0.0678, 
        0.0536, 0.0185, 1.0000
    ];
    
    const fpercentages = [
        0.0514, 0.0485, 0.0463, 0.0463, 0.0414, 0.0393, 0.0374, 0.0353, 0.03686, 0.2844, 1.000
    ];
    
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
                glitter += (Math.random() > 0.5) ? 20 : 8;
            } else {
                fpity++;
            }
        }
        count++;
    }
    return { count, glitter };
}

function main() {
    let copies = parseInt(prompt("Enter how many rate-up characters you want:"));
    console.log("Simulating...");
    
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
    
    console.table({
        "Average Pulls": mean(totalWarps).toFixed(3),
        "Median Pulls": median(totalWarps),
        "Max Pulls": Math.max(...totalWarps),
        "Min Pulls": Math.min(...totalWarps),
        "Average Undying Starlight": mean(totalGlitter).toFixed(3),
        "Median Undying Starlight": median(totalGlitter)
    });
}

main();
