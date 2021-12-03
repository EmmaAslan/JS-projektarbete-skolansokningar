let parent = document.querySelector("#studentList");

async function fetchInfo(){
    let response = await fetch("https://api.mocki.io/v2/01047e91/students");
    let students = await response.json();
    //console.log(students);

    let profileInfo = document.createElement("div");
    students.forEach((object) => {
        let profileName = document.createElement("p");
        profileName.innerHTML = `${object.firstName} ${object.lastName}`;
        profileInfo.appendChild(profileName);
    }); 
    parent.appendChild(profileInfo); 
    
    let filterEducation = document.querySelector("#filterEducation");
    let choices = document.querySelectorAll("[name='student']");

    filterEducation.addEventListener("click", () => {
        let filteredStudents = "";
        //id="studentlist"
        choices.forEach(input => {
            if (input.checked){
                filteredStudents = input.value;
            }
        });
        
        let filteredList = [];
        if (filteredStudents === "Frontend"){
            filteredList = students.filter(item => item.programme === "Frontend");
        } else if (filteredStudents === "Backend"){
            filteredList = students.filter(item => item.programme === "Backend");
        } else if (filteredStudents === "Net"){
            filteredList = students.filter(item => item.programme === ".NET");
        }

        filteredList.forEach(item => {
            let filteredStudents = document.createElement("p");
            parent.appendChild(filteredStudents);
            filteredStudents.innerHTML = `Name: ${item.firstName} ${item.lastName}, age: ${item.age}`;
        });
    })

};

fetchInfo();

//console.log(fetchInfo)




//EXEMPELKOD FÖR ATT FILTRERA!!
/*
let button = document.querySelector("button");
let inputs = document.querySelectorAll("[name='student']");
let ulLista = document.querySelector("#ul")
let checkbox = document.querySelector("#checkbox");

button.addEventListener("click", () => {
    if (checkbox.checked){
        let showStudents = "";
        ulLista.textContent = "";
        inputs.forEach(input => {
            if (input.checked){
                showStudents = input.value;
            }
        });
        let studentList = [];
        if (showStudents === "Frontend") {
            studentList = studentItems.filter(item => item.education === "Frontend");
        } else if (showStudents === "Javascript") {
            studentList = studentItems.filter(item => item.education === "Javascript");
        } else if (showStudents === "UX") {
            studentList = studentItems.filter(item => item.education === "UX");
        }
        
        studentList.forEach(item => {
            let filteredStudent = document.createElement("li");
            ulLista.appendChild(filteredStudent);
            filteredStudent.innerHTML = `${item.name}, <b>${item.city}</b>`;
        });
    } else {
        ulLista.textContent = "Please confirm you’re a teacher!";
    }
});
*/


/*
let newData = async (URL) => {
let response = await fetch(URL);
let data = await response.json();
return data;
};


async function fetchInfo(){
    let studenName = await newData("https://api.mocki.io/v2/01047e91/students");

    studenName.forEach((object) => {
        let profileName = document.createElement("p");
        profileName.innerHTML = `<li>${object.firstName} ${object.lastName}</li>`;
        document.querySelector("#studentList").appendChild(profileName)
        //profileInfo.appendChild(profileName);
    }); 
    //parent.appendChild(profileInfo);   
};
*/
