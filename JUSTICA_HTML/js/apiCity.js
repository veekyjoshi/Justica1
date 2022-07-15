//import URL from "./config.js";
//required("./config.js");

function getCitylist()
{
    //const data = { username: varusername, password:varpassword };
        fetch(URL+'city/getCityList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(null),
                })
                .then((response) => response.json())
                //Then with the data from the response in JSON...
                .then((data) => {
                console.log('Success:', data);
                return data;
                })
                //Then with the error genereted...
                .catch((error) => {
                console.error('Error:', error);
                    return error;
                }); 

            
} 
//export function getCitylist();

// // When the login button is clicked, the following code is executed
// loginButton.addEventListener("click", (e) => {
//     // Prevent the default submission of the form
//     e.preventDefault();
//     // Get the values input by the user in the form fields
//     const varusername = loginForm.username.value;
//     const varpassword = loginForm.password.value;

//     if (varusername !=null && varpassword !=null) { // If the credentials are valid, show an alert box and reload the page
//         const data = { username: varusername, password:varpassword };
//         fetch(URL+'Lawyer/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//                 })
//                 .then((response) => response.json())
//                 //Then with the data from the response in JSON...
//                 .then((data) => {
//                 console.log('Success:', data);
//                 })
//                 //Then with the error genereted...
//                 .catch((error) => {
//                 console.error('Error:', error);
//                 });
        
//         //httpPost("https://localhost:44325/api/admin/login")
//         alert("You have successfully logged in.");
//         location.reload();
//     } else { // Otherwise, make the login error message show (change its oppacity)
//         loginErrorMsg.style.opacity = 1;
//     }

    
// })

