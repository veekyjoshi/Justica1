//const URL="http://localhost:8081/api/"; 

async function sendRequestWithToken(apiPath,data)
{
    const reponse= await fetch("http://localhost:8081/api/"+apiPath,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token':''+localStorage.getItem('token')+'',
        },
        body: JSON.stringify(data)
    });

    var data=reponse.json();
    return data;
    
} 
async function sendRequestWithOutToken(apiPath,data)
{
    const reponse= await fetch("http://localhost:8081/api/"+apiPath,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    var data=reponse.json();
    return data;
    
} 

export {sendRequestWithToken,sendRequestWithOutToken}

// async function getResponse(APIName,data)
// {
//     var output=null;
//     fetch("http://localhost:8081/api/" + APIName, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'token':''+localStorage.getItem('token')+'',
//         },
//         body: JSON.stringify(data)
//     }).then((response) => response.json())
//     // Then with the countryData from the response in JSON....then((countryData) => {
//         .then((data) => {
//         ////console.log('Success:', countryData);
//         //console.log('lawSubType:', lawSubType.obj);
//         //countryData.obj;
//         console.log(data);
//             return new Promise(function(resolve) {
//                 return resolve(data);
//               });
         
//     });
//     return output;
// }