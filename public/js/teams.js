document.getElementById("addTeamForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const school_name = document.getElementById("schoolName").value;
  const school_abv = document.getElementById("schoolAbreviation").value;
  const team_name = document.getElementById("teamName").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  if (password !== password2) {
    return alert("Passwords do not match!");
  }

  const newSchool = {
    school_name,
    school_abv,
    team_name,
    password,
  };

  fetch("/api/teams", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSchool),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = data.redirectTo;
    });
});
