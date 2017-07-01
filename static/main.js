function main () {
    app.APIHandler.getApiData("https://swapi.co/api/planets/", app.DOMHandler.populatePlanetsTable);
}

$('document').ready(main);