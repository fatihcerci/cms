function postModelLog(url, data, token) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
             return json;
        })
        .catch(function (error) {
            console.log(error);
        });
}