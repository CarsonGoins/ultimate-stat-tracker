document.getElementById("submitPass2").addEventListener("click", (event) => {
    const passInput = document.getElementById("form122").value;

    if(passInput === "y"){
        document.querySelector("section.section").style.display = "block";
    }
    else{
        alert("You are not the admin");
    }
});

document.getElementById("deleteTeamForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const school_name = document.getElementById("schoolN").value;
    const school_abv = document.getElementById("teamAbv").value;
    const school_pass = document.getElementById("teamPass").value;
    const school_Id = document.getElementById("teamId").value;

    const removedTeam = {
      school_name,
      school_abv,
      school_pass,
      school_Id
    };
    fetch("/api/teams", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(removedTeam),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.redirectTo;
      });
  });
  

//     fetch("/api/teams", {
//       method: "DELETE",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(removedTeam),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         window.location.href = data.redirectTo;
//       });
//   });



// const deleteTeam = document.querySelectorAll("#deleteTeams");
// console.log(deleteTeam[1].innerHTML);
// let text = " ";
// deleteTeam.forEach((button) => {

//     button.addEventListener("click", () => {
//         text += (document.getElementById("deleteTeams").innerHTML);
//         console.log(text);
// });
// });


//     const deleteTeam = document.querySelectorAll("#deleteTeams");
// for(let i = 0; i < deleteTeam.length; i++){
// deleteTeam.forEach((button) => {
// button.addEventListener("click", (event) => {
// document.getElementById("temp").innerHTML = deleteTeam[i].innerHTML;
// })
// });}