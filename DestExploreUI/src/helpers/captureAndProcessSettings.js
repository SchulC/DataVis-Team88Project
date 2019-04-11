


export function captureAndProcess(
    candidateCities,
    closestAirports,
    budget,
    airlineDisable,
    availability,
    tripDuration,
    weatherControlOn,
    userTempRange,
    userPrecipRange,
    crimeRating,
    selectedActivities,
    selectedFood
) {
    var airportQstring;
    var availabilityQstring;
    var temperatureRange;
    var precipitationRange;

    // Get airport query ready
    var airportList = [];
    closestAirports.forEach(airport => {
        airportList.push(airport.code);
    });
    airportQstring = "'" + airportList.join("','") + "'";

    // Process availability if it exists
    if (availability.startDate === null) {
        // if it doesn't exist it will be all months
        availabilityQstring =
            " '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ";
    } else {
        let startMonth = availability.startDate.split("/")[1];
        let endMonth = availability.endDate.split("/")[1];

        if (startMonth === endMonth) {
            // if it only spans one month
            availabilityQstring = `'${startMonth}'`;
        } else {
            // if spans multiple months
            let dateArray = Array.apply(
                0,
                Array(parseInt(endMonth) - parseInt(startMonth) + 1)
            ).map((element, index) => index + parseInt(startMonth));
            let monthStrLst = [];
            for (let m of dateArray) {
                let s = m.toString();
                if (s.length === 1) s = "0" + s;
                monthStrLst.push("'" + s + "'");
            }
            availabilityQstring = monthStrLst;
        }
    }

    // process weather if enabled or set to default
    if (!weatherControlOn) {
        temperatureRange = [-5, 100];
        precipitationRange = [0, 100];
    } else {
        temperatureRange = [userTempRange.low, userTempRange.high];
        precipitationRange = [userPrecipRange.low, userPrecipRange.high];
    }

    // process city ids
    let candidateCityQString = "'" + candidateCities.join("', '") + "'";

    return {
        candidateCitiesString: candidateCityQString,
        candidateCities: candidateCities,
        closestAirports: airportQstring,
        budget: budget,
        airlineBudget: budget*0.4,
        airlineDisable: airlineDisable,
        availability: availabilityQstring,
        tripDuration: tripDuration,
        weatherControlOn: weatherControlOn,
        userTempRange: temperatureRange,
        userPrecipRange: precipitationRange,
        crimeRating: crimeRating,
        selectedActivities: selectedActivities,
        selectedFood: selectedFood
    };

}