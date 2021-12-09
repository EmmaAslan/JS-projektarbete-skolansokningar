let noFilterStudentList = document.querySelector("#studentList");
let filteredStudentList = document.querySelector("#filterStudentList");
let filterEducation = document.querySelector("#filterEducation");
let choices = document.querySelectorAll("[name='student']");

let sortButtons = document.querySelector("#sortButtons");
let sortAge = document.querySelector("#sortAge");
let sortFirstName = document.querySelector("#sortFirstName");
let sortLastName = document.querySelector("#sortLastName");

let filteredProgramme = "";

sortButtons.hidden = true; //Knappar för att sortera ut elever döljs
noFilterStudentList.hidden = false; //Lista med ofiltrerade elever visas

let getData = async (URL) => {
  let response = await fetch(URL);
  let data = await response.json();
  return data;
};

async function fetchInfo() {
  let students = await getData("https://api.mocki.io/v2/01047e91/students");
  let schools = await getData("https://api.mocki.io/v2/01047e91/schools");

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

    let filter = students.filter(
      (student) => student.programme === filteredProgramme
    );

    //En funktion som skapar elever och tillhörande knappar som visar matchande skolor
    function createStudent(elev) {
      //Skapar element för varje elev
      let eachStudent = document.createElement("p");
      eachStudent.textContent = `${elev.firstName} ${elev.lastName}, ${elev.age}`;
      filteredStudentList.appendChild(eachStudent);

      //Skapar element för skolor som matchar
      let relatedSchools = document.createElement("button");
      relatedSchools.textContent = "Visa skolor";
      eachStudent.appendChild(relatedSchools);

      //Skapar ett element där skolorna skrivs ut för att kunna tömma denna så inte uppgifterna skrivs ut mer än en gång
      let tomDiv = document.createElement("div");
      tomDiv.innerHTML = "";
      eachStudent.appendChild(tomDiv);

      //Skapar en funktion för varje "Visa Skolor"-knapp 
      relatedSchools.addEventListener("click", () => {
        tomDiv.innerHTML = ""; //Tömmer div:en varje gång man trycker på knappen - får bara ut informationen en gång.
        schools.forEach((school) => {
          let relatedSchoolList = document.createElement("p");
          relatedSchoolList.innerHTML = "";
          for (let i = 0; i < school.programmes.length; i++) {
            for (let j = 0; j < elev.hobbies.length; j++) {
              for (let k = 0; k < school.activities.length; k++) {
                if (
                    elev.programme === school.programmes[i] &&
                    elev.hobbies[j] === school.activities[k]
                ) {
                  relatedSchoolList.innerHTML = `<div>${school.name}</div>`;
                  tomDiv.appendChild(relatedSchoolList);
                }
              }
            }
          }
        });
      });
    };
    
    //Skapar p-taggar för varje utfiltrerad elev
    filter.forEach((student) => {
        createStudent(student) //Funktion som skapar elever och tillhörande knappfunktioner för att visa matchande skolor 
    });

    //Knapp för att sortera filtrerad lista i åldersordning med yngst först
    sortAge.addEventListener("click", () => {
      filter.sort((age1, age2) => {
        return age1.age - age2.age;
      });

      //Tömmer den existerande filtrerade listan
      filteredStudentList.innerHTML = "";

      //Skriver ut eleverna igen men i sorterad ordning
      filter.forEach((student) => {
        createStudent(student) //Funktion som skapar elever och tillhörande knappfunktioner för att visa matchande skolor
      });
    });

    //Knapp för att sortera filtrerad lista i bokstavsordning baserat på förnamn
    sortFirstName.addEventListener("click", () => {
      filter.sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });

      //Tömmer den existerande filtrerade listan
      filteredStudentList.innerHTML = "";

      //Skriver ut eleverna igen men i sorterad ordning
      filter.forEach((student) => {
        createStudent(student) //Funktion som skapar elever och tillhörande knappfunktioner för att visa matchande skolor
      });
    });

    //Knapp för att sortera filtrerad lista i bokstavsordning baserat på efternamn
    sortLastName.addEventListener("click", () => {
      filter.sort((a, b) => {
        if (a.lastName < b.lastName) {
          return -1;
        }
        if (a.lastName > b.lastName) {
          return 1;
        }
        return 0;
      });

      //Tömmer den existerande filtrerade listan
      filteredStudentList.innerHTML = "";

      //Skriver ut eleverna igen men i sorterad ordning
      filter.forEach((student) => {
        createStudent(student) //Funktion som skapar elever och tillhörande knappfunktioner för att visa matchande skolor
      });
    });
  });
}
fetchInfo();
