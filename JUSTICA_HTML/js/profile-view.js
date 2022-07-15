const token = localStorage.getItem('token');
        //console.log('token is '+token);
        if(!token)
        {
            window.location.href = "login.html";
            document.getElementById("login-error-msg").innerHTML('Session expired, Please login again.');
            document.getElementById("login-error-msg").hidden=false;
        }

        const ProfileViewErrorMsg = document.getElementById("profile-view-error-msg");

const ProfileViewlawyerName = document.getElementById("profile-view-lawyerName");

const ProfileviewEmail= document.getElementById("profile-view-email");
const ProfileviewMobile= document.getElementById("profile-view-mobile");
const ProfileviewEexperience= document.getElementById("profile-view-experience");
const Profileviewdob= document.getElementById("profile-view-dob");
const ProfileviewLicenseNo= document.getElementById("profile-view-licenseNo");
const ProfileviewAddress= document.getElementById("profile-view-address");
const ProfileviewCity= document.getElementById("profile-view-city");
const ProfileviewState= document.getElementById("profile-view-state");
const ProfileviewCountry= document.getElementById("profile-view-country");

const loginErrorMsg = document.getElementById("profile-view-logout");
loginErrorMsg .addEventListener("click", (e) =>
{
    localStorage.clear();
    window.location.href = "login.html";
})

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

var profileOutput=sendRequestWithToken("lawyer/getProfile",{} );

profileOutput.then((dataString=>{
    if(dataString.code=="200")
    {
        //console.log(dataString);
        ProfileViewlawyerName.innerHTML=dataString.obj.name;
        ProfileviewEmail.innerText=dataString.obj.email;
        ProfileviewMobile.innerText=dataString.obj.mobile;
ProfileviewEexperience.innerText=dataString.obj.experience;
Profileviewdob.innerText=dataString.obj.dob;
ProfileviewLicenseNo.innerText=dataString.obj.licenseNo;
ProfileviewAddress.innerText=dataString.obj.address;
ProfileviewCity.innerText=dataString.obj.cityName;
 ProfileviewState.innerText=dataString.obj.stateName;
 ProfileviewCountry.innerText=dataString.obj.countryName;
    }else{
        ProfileViewErrorMsg.innerText=dataString.obj;
        ProfileViewErrorMsg.hidden=false;
    }

}));

var praticeAreaOutput=sendRequestWithToken("lawyerLawSubtypeMapping/getLawyerLawSubtypeMappingList",{} );

praticeAreaOutput.then((dataString=>{
    if(dataString.code=="200")
    {
        console.log(dataString);
        var subTypeList=dataString.obj;
        subTypeList.forEach(subTypeObj => {
            $("#profile-view-praticeArea").append("\
            <div class='col-lg-4 col-md-6 mb30'>\
                            <div class='f-box f-icon-left f-icon-rounded'>\
                                <i class='icofont-group bg-color text-light'></i>\
                                <div class='fb-text'>\
                                    <h4>"+subTypeObj.lawSubtypeObj.name+"</h4>\
                                    <p>"+subTypeObj.lawSubtypeObj.description+"\
                                    </p>\
                                </div>\
                            </div>\
                        </div> \
            ");
        });
    }else{
        ProfileViewErrorMsg.innerText=dataString.obj;
        ProfileViewErrorMsg.hidden=false;
    }

}));






async function lawyerLawSubtypeMappingAPI(data,apiName)
{
    const reponse= await fetch("http://localhost:8081/api/"+apiName,{
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


