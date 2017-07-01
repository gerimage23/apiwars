var app = app || {};

app.DOMHandler = {

    populatePlanetsTable: function(planetData) {
        var table = document.getElementById('planets-body');
        $(table).empty();


        // Set the value of the 'Previous' and 'Next' buttons'
        $('#previous').off();
        $('#previous').on('click', function () {
            previousPageUrl = planetData['previous'];
            app.APIHandler.getApiData(previousPageUrl, app.DOMHandler.populatePlanetsTable);
        });

        $('#next').off();
        $('#next').on('click', function () {
           nextPageUrl = planetData['next'];
           app.APIHandler.getApiData(nextPageUrl, app.DOMHandler.populatePlanetsTable);
        });

        // Sort it out what information is necessary from the results
        var results = planetData['results'];

        // Set up table rows from the information
        tableRows = app.DOMHandler.createPlanetRows(results);

        // Add the additional information to the table (append)
        for (let i = 0; i < tableRows.length; i++) {
            table.appendChild(tableRows[i]);
        };
    },


    createPlanetRows: function(planetData) {
        var tableRows = [];
        var properties = ["name", "diameter", "climate", "terrain", "surface_water", "population", "residents"];
        for (let i = 0; i < planetData.length; i++) {
            var planetRow = document.createElement('tr');
            planetRow.className = 'planets-row';
        
            for (let j = 0; j < properties.length; j++) {
                var tableData = document.createElement('td');
                tableData.className = 'plants-data';

                tdToStr = planetData[i] [properties[j]];
                switch (properties[j]) {
                    case 'diameter':
                        if (tdToStr !== 'unknown') {
                            tdToStr = this.numberWithCommas(tdToStr).toString();
                            tdToStr += ' km';
                        }
                        break;
                    case 'population':
                        if (tdToStr !== 'unknown') {
                    
                        tdToStr = this.numberWithCommas(tdToStr).toString();
                        tdToStr += ' people';
                        }
                        break;
                    case 'surface_water':
                        if (tdToStr !== 'unknown'){
                            tdToStr += "%";
                        }
                        break;
                    case 'residents':
                        tdToStr = this.getResidentsButton(tdToStr);
                        tableData.setAttribute("data-planetname", planetRow.firstChild.innerHTML);
                        break;
                    default:
                        break;
                }
                    if (properties[j] === 'residents') {
                        if (typeof tdToStr === 'string'){
                            tableData.innerHTML = tdToStr;
                        }
                        else{
                            tableData.appendChild(tdToStr);
                    }
                }
                else {
                    tableData.innerHTML = tdToStr;
                }
               
                planetRow.appendChild(tableData);
            }
            tableRows.push(planetRow);

        }
        return tableRows;
    },

    numberWithCommas: function(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    getResidentsButton: function(residentsLinksList) {
        if (residentsLinksList.length === 0) {
            return "No known resident(s)."
        }

        var residentsNumber = residentsLinksList.length;
        var residentsButton = document.createElement('button');
        residentsButton.className = 'residents-button btn btn-info';
        residentsButton.innerHTML = residentsNumber.toString() + " resident(s).";
        residentsButton.addEventListener('click', function() {
            for (var i = 0; i < residentsLinksList.length; i++) {
                app.APIHandler.getApiData(residentsLinksList[i], app.DOMHandler.createResidentsRows);
            }
            $('#residents-body').empty();
            $('.modal-title').html("Residents of " + this.parentElement.dataset["planetname"]);
            $('#starModal').modal();
        })  

        return residentsButton;
    },

    createResidentsRows: function(residentsData) {
        var properties = ['name', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'];
        var residentsRow = document.createElement('tr');
        
        for (let i = 0; i < properties.length; i++) {
            var tableData = document.createElement('td');
            tableData.innerHTML = residentsData[properties[i]];
            residentsRow.appendChild(tableData);

        }
        
        document.getElementById('residents-body').appendChild(residentsRow);
    },

}
