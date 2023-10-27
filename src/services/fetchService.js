

function grab (url, reqMethod, jwt, reqBody) {

    const fetchData = {
        headers: {
            "Content-Type" : "application/json"
        },
        method : reqMethod

    }

    if(jwt) {
        fetchData.headers.Authorization = `Bearer ${jwt}`
    }

    if (reqBody){
        fetchData.body = JSON.stringify(reqBody)
    }

    return fetch(url, fetchData).then((response) => {
        if(response.status === 200)
            return response.json();
        //else(response.status => 400){redirect to login}
    });
}

export default grab;