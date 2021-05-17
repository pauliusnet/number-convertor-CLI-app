import {
    ENDING_TEXT,
    GREETING_TEXT,
    HUNDRED,
    INPUT_TEXT,
    INVALID_NUMBER_VALIDATION_TEXT,
    MINUS,
    ONE_NUMBER,
    ONES, RESULT_TEXT,
    TEENS,
    TENS,
    THOUSAND,
    WHITE_SPACE,
    ZERO_NUMBER,
    ZERO_TEXT
} from './constants';
import {performance} from "perf_hooks";

function startApplication() {
    process.stdout.write(GREETING_TEXT);
    handleInput();
}

function handleInput(): void {
    process.stdout.write(INPUT_TEXT);
    process.stdin.on('data', (inputData) => {
        const numberInput = Number(inputData);
        if (numberInput || numberInput === 0) {
            const isValidInput = Math.abs(numberInput) < 100000

            isValidInput
                ? process.stdout.write(RESULT_TEXT + convertNumberToEnglishText(numberInput) + '\n\n')
                : process.stdout.write(INVALID_NUMBER_VALIDATION_TEXT);

            process.stdout.write(INPUT_TEXT);
        } else {
            exitApplication();
        }
    })
}

function exitApplication(): void {
    process.stdout.write(ENDING_TEXT);
    process.exit();
}

export function convertNumberToEnglishText(number: number): string {
    const digitsArray: string[] = Array.from(String(Math.abs(number))).reverse();
    const isNegative: boolean = number < 0;
    let resultArray: string[] = [];

    if (digitsArray.length === 1 && digitsArray[0] === ZERO_NUMBER) {
        return ZERO_TEXT;
    }

    for (let i = 0; i < digitsArray.length; i++) {
        const currentNumber: string = digitsArray[i];
        const previousNumber: string = digitsArray[i - 1] || ZERO_NUMBER;

        if (currentNumber === ZERO_NUMBER) {
            continue;
        }

        if (i === 0) {
            resultArray.unshift(ONES[currentNumber])
        }

        if (i === 1) {
            if (currentNumber === ONE_NUMBER) {
                resultArray[0] = TEENS[currentNumber + previousNumber]
            } else {
                resultArray.unshift(TENS[currentNumber])
            }
        }

        if (i === 2) {
            resultArray.unshift(ONES[currentNumber] + WHITE_SPACE + HUNDRED)
        }

        if (i === 3) {
            resultArray.unshift(ONES[currentNumber] + WHITE_SPACE + THOUSAND)
        }

        if (i === 4) {
            if (currentNumber === ONE_NUMBER) {
                resultArray[0] = TEENS[currentNumber + previousNumber] + WHITE_SPACE + THOUSAND
            } else if (previousNumber === ZERO_NUMBER) {
                resultArray.unshift(TENS[currentNumber] + WHITE_SPACE + THOUSAND);
            }  else {
                resultArray.unshift(TENS[currentNumber]);
            }
        }
    }
    return isNegative ? MINUS + resultArray.join(WHITE_SPACE) : resultArray.join(WHITE_SPACE);
}

startApplication();
