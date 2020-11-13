window.onload = async function () {
    await render('intro');
};

async function render(data){
    let response = await fetch(`/html/${data}.html`);
    data = await response.text();
    document.getElementById("main").innerHTML = data;
}