const sec = a => 1 + a;
const add = (a, b) => (b === 0) ? a : sec(add(a, b - 1));
const mpy = (a, b) => (b === 1) ? a : add(a, mpy(a, b - 1));
const pwr = (a, b) => (b === 0) ? 1 : mpy(a, pwr(a, b - 1));

function init() {
    console.log("Page loaded")
    console.log("Press underload for last stack call")
    console.log("Press overload to pay respects")
}

function UnderLoad() {
    console.log(pwr(2,13));
};

function OverLoad() {
    console.log(pwr(2,14));
};


document.addEventListener("DOMContentLoaded", function (event) {
    init();
});