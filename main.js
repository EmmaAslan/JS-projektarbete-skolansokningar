let noFilterStudentList = document.querySelector("#studentList");
let filteredStudentList = document.querySelector("#filterStudentList");
let filterHeadLine = document.querySelector("#filterHeadLine");
let filterEducation = document.querySelector("#filterEducation");
let choices = document.querySelectorAll("[name='student']");

let sortButtons = document.querySelector("#sortButtons");
let sortAge = document.querySelector("#sortAge");
let sortFirstName = document.querySelector("#sortFirstName");
let sortLastName = document.querySelector("#sortLastName");

let filteredProgramme = "";

sortButtons.hidden = true; //Knappar för att sortera ut elever döljs

noFilterStudentList.hidden = false; //Lista med ofiltrerade elever visas

async function fetchInfo() {
  let response = await fetch("https://api.mocki.io/v2/01047e91/students");
  let students = await response.json();
  //console.log(students);

  //Lista med alla elever
  let profileInfo = document.createElement("div");
  students.forEach((object) => {
    let profileName = document.createElement("p");
    profileName.innerHTML = `${object.firstName} ${object.lastName}, age: ${object.age}, programme: ${object.programme}`;
    profileInfo.appendChild(profileName);
  });
  noFilterStudentList.appendChild(profileInfo);

  //Knapp för att filtrera ut elever per utbildning
  filterEducation.addEventListener("click", () => {
    filteredStudentList.innerHTML = "";
    choices.forEach((input) => {
      if (input.checked) {
        filteredProgramme = input.value;
        noFilterStudentList.hidden = true; //Om en radiobutton är "checked", ofiltrerad lista göms
      }
    });

    sortButtons.hidden = false;
    //console.log(filteredProgramme);

    let filter = students.filter(
      (student) => student.programme === filteredProgramme
    );
    
    //Skapar p-taggar för varje utfiltrerad elev
    filter.forEach((student) => {
      //console.log(student);
      let eachStudent = document.createElement("p");
      eachStudent.textContent = `${student.firstName} ${student.lastName}, ${student.age}`;
      filteredStudentList.appendChild(eachStudent);   
    });

    //Knapp för att sortera filtrerad lista i åldersordning med yngst först
    sortAge.addEventListener("click", ()=> {
        filter.sort((age1, age2) => {
            return age1.age - age2.age;
        });

        //Tömmer den existerande filtrerade listan
        filteredStudentList.innerHTML = "";
        
        //Skriver ut eleverna igen men i sorterad ordning
        filter.forEach((student) => {
            //console.log(student);
            let eachStudent = document.createElement("p");
            eachStudent.textContent = `${student.firstName} ${student.lastName}, ${student.age}`;
            filteredStudentList.appendChild(eachStudent);   
          });
    });
    
    //Knapp för att sortera filtrerad lista i bokstavsordning baserat på förnamn
    sortFirstName.addEventListener("click", ()=>{
        // console.log("Sortera i bokstavsordning baserat på förnamn");
        filter.sort((a, b)=>{
            if (a.firstName < b.firstName) { 
                return -1; 
            } if (a.firstName > b.firstName) { 
                return 1; 
            }
            return 0;
        });

        //Tömmer den existerande filtrerade listan
        filteredStudentList.innerHTML = "";
    
        //Skriver ut eleverna igen men i sorterad ordning
        filter.forEach((student) => {
            //console.log(student);
            let eachStudent = document.createElement("p");
            eachStudent.textContent = `${student.firstName} ${student.lastName}, ${student.age}`;
            filteredStudentList.appendChild(eachStudent);   
        });
    });
    
    //Knapp för att sortera filtrerad lista i bokstavsordning baserat på efternamn
    sortLastName.addEventListener("click", ()=>{
        //console.log("Sortera i bokstavsordning baserat på efternamn");
        filter.sort((a, b)=>{
            if (a.lastName < b.lastName) { 
                return -1; 
            } if (a.lastName > b.lastName) { 
                return 1; 
            }
            return 0;
        });

        //Tömmer den existerande filtrerade listan
        filteredStudentList.innerHTML = "";
    
        //Skriver ut eleverna igen men i sorterad ordning
        filter.forEach((student) => {
            //console.log(student);
            let eachStudent = document.createElement("p");
            eachStudent.textContent = `${student.firstName} ${student.lastName}, ${student.age}`;
            filteredStudentList.appendChild(eachStudent);   
        });
    });
  });
}

fetchInfo();
