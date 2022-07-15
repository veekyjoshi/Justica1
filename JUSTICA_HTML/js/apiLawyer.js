//import URL from "config.js";
const URL="http://localhost:8081/api/"; 

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
/* #region  Lawyers */


// When the login button is clicked, the following code is executed
loginButton.addEventListener("click", (e) => {
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const varusername = loginForm.username.value;
    const varpassword = loginForm.password.value;

    if (varusername !=null && varpassword !=null) { // If the credentials are valid, show an alert box and reload the page
        const details = { username: varusername, password:varpassword };
        fetch(URL+'lawyer/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
                })
                .then((response) => response.json())
                //Then with the data from the response in JSON...
                .then((data) => {
                    console.log('Success:', data);
                    console.log(data.code);
                    if(data.code=='201')
                    {
                        loginErrorMsg.innerHTML=data.obj;
                        loginErrorMsg.hidden=false;

                    }else if(data.code=='200'){
                        if(localStorage.getItem('token'))
                        {
                            localStorage.clear()
                        }
                        localStorage.setItem('token', data.obj);
                        fetch(URL+'lawyer/getProfile', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'token':data.obj,
                                
                            },
                            body: JSON.stringify({}),
                            }).then((response) => response.json())
                            //Then with the data from the response in JSON...
                            .then((profile) => {
                                //alert('profile');
                                if(profile.code=='200')
                                {
                                    console.log('profile', profile.obj);
                                    //alert('profile');
                                    //localStorage.setItem('profile', profile.obj);
                                    localStorage.setItem('name', profile.obj.name);
                                    localStorage.setItem('email', profile.obj.email);
                                    localStorage.setItem('mobile', profile.obj.mobile);
                                    localStorage.setItem('dob', profile.obj.dob);
                                    localStorage.setItem('image', profile.obj.image);
                                    localStorage.setItem('address', profile.obj.address);
                                    localStorage.setItem('experience', profile.obj.experience);
                                    localStorage.setItem('fees', profile.obj.fees);
                                    localStorage.setItem('cityId', profile.obj.city_id);
                                    localStorage.setItem('licenseNo', profile.obj.licenseNo);
                                    window.location.href = 'profile-home.html';
                                }
                            })
                        
                    }
                })
                //Then with the error genereted...
                .catch((error) => {
                console.error('Error:', error);
                loginErrorMsg.innerHTML='error: ',error;
                loginErrorMsg.hidden=false;
                });
        
        //httpPost("https://localhost:44325/api/admin/login")
        //alert("You have successfully logged in.");
        //location.reload();
    } else { // Otherwise, make the login error message show (change its oppacity)
        loginErrorMsg.style.opacity = 1;
    }

    
})


// const registrationForm= document.getElementById("registration-form");
// const registrationButton = document.getElementById("registration-form-submit");
// const registrationErrorMsg = document.getElementById("registration-error-msg");


// //Registration API
// registrationButton.addEventListener("click", (e) => {
//     // Prevent the default submission of the form
//     e.preventDefault();
//     // Get the values input by the user in the form fields
//     const varname = loginForm.name.value;
//     console.log(name);
//     const varemail = loginForm.email.value;
//     const varmobile = loginForm.mobile.value;
//     const varpassword = loginForm.password.value;
//     const varlicenseNo = loginForm.licenseNo.value;
//     const varaddress = loginForm.address.value;
//     const vardob = loginForm.dob.value;

//     if (varusername !=null && varpassword !=null) { // If the credentials are valid, show an alert box and reload the page
//         const data = {
//             email: varemail,
//             name:varname,
//             mobile: varmobile,
//             password: varpassword,
//             dob:vardob,
//             experience:null,
//             licenseNo:varlicenseNo,
//             fees:null,
//             image:null,
//             address:varaddress,
//             cityId:1
        
//         };
//         console.log(data);
//         fetch(URL+'Lawyer/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//                 })
//                 .then((response) => response.json())
//                 //Then with the data from the response in JSON...
//                 .then((data) => {
//                 //console.log('Success:', data);
//                 if(data.code=='201')
//                     {
//                         registrationErrorMsg.innerHTML=data.obj;
//                         registrationErrorMsg.hidden=false;

//                     }else if(data.code=='200')
//                     {
//                         console.log(data.obj);
//                         //window.location.href = 'login.html';
//                     }
//                 })
//                 //Then with the error genereted...
//                 .catch((error) => {
//                 console.error('Error:', error);
//                 });
        
//         //httpPost("https://localhost:44325/api/admin/login")
//         //alert("You have successfully logged in.");
//         //location.reload();
//     } else { // Otherwise, make the login error message show (change its oppacity)
//         loginErrorMsg.style.opacity = 1;
//     }

    

// })

/* #endregion */



