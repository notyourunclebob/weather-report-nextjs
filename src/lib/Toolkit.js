// retrieves JSON data from a URL and runs a function when the data is retrieved, passing along the JSON data as an argument
// arguments :
// retrieveURL : string - the URL to retrieve the JSON data from
// success : function - the function to call when the data is retrieved
// failure : function - the function to call when the data is not retrieved and an error occurs
// debug : boolean - whether to throw an error if one occurs (default is set to true)
export async function getJSONData(retrieveURL, success, failure, debug = true) {
    fetch(retrieveURL)
        .then(response => response.json())
        .then(data => success(data))
        .catch(error => {
            failure(error);
            if (debug) throw error;
        });
}