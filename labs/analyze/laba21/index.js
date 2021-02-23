function init() {
    console.log("Page loaded.")
}

function loadProfile() {
    pwr = 0
    mpy = 0
    add = 0
    sec = 0
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        console.log("rock")
        data = xhr.responseText;
        for (const element of data) {
              try {
                nodes = element['args']['data']['cpuProfile']['nodes']
                for (const node of nodes) {
                    if (node['callframe']['functionName'] == 'pwr') {
                        pwr += 1;
                        continue;
                    };
                    if (node['callframe']['functionName'] == 'mpy') {
                        mpy += 1;
                        continue;
                    };
                    if (node['callframe']['functionName'] == 'add') {
                        add += 1;
                        continue;
                    };
                    if (node['callframe']['functionName'] == 'sec') {
                        sec += 1;
                        continue;
                    };
                };
            } catch (err) {
                continue;
            };

        };
        console.log(pwr);
        console.log(mpy);
        console.log(add);
        console.log(sec);

    };
    xhr.open('GET', './Profile-20210223T023455.json', false);
    xhr.send();
};


document.addEventListener("DOMContentLoaded", function (event) {
    init();
    loadProfile();
});