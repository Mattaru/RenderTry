const data = {
    displayNumbers: [0, 0, 0, 0, 0],
    numbersArray: [],
};

const generateArray = async({ request, response }) => {
    const body = request.body();
    const params = await body.value;
    const participants = Number(params.get("participants"))

    data.numbersArray = Array.from({ length: participants }, (_, i) => i + 1);
    data.displayNumbers = data.numbersArray.slice(0, 5);

    response.redirect("/");
};

const viewMain = async({ render }) => {
    return await render("index.eta", data);
};


export {
    generateArray,
    viewMain
};