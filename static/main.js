function main () {
    app.APIHandler.getApiData("http://swapi.co/api/planets/", app.DOMHandler.populatePlanetsTable);
}

$('document').ready(main);