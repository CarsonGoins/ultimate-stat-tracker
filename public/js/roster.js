document.getElementById("addPlayerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const player_name = document.getElementById("playerName").value;
  const player_num = document.getElementById("playerNum").value;
  const school_id = window.location.href.split("=").pop();
  const goals = 0;
  const assists = 0;
  const blocks = 0;
  const points_played = 0;

  const newPlayer = {
    player_name,
    player_num,
    goals,
    assists,
    blocks,
    points_played,
    school_id,
  };

  fetch("/api/players", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlayer),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = window.location.href;
    });
});

document.getElementById("submitPass").addEventListener("click", (event) => {
  const passInput = document.getElementById("form12").value;

  localStorage.setItem(window.location.href.split("=").pop(), passInput); //storing team id and password locally

  fetch("/api/team-password", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: localStorage.getItem(window.location.href.split("=").pop()),
      id: parseInt(window.location.href.split("=").pop()),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // If data is incorrect alert
      if (data.message) {
        alert(data.message);
      }
      // If data is correct display this info
      else {
        document.getElementById("rosterRow").innerHTML = `
        <div class="container-md vertical-center">
        <button data-toggle="modal" type="button" data-target="#addPlayerModal" id="addPlayerModalButton" class="btn btn-primary mb-4s">Add Player
        </button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Goals</th>
              <th scope="col">Assists</th>
              <th scope="col">Blocks</th>
              <th scope="col">Points Played</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="tBody">
          </tbody>
        </table>`;
        const tBody = document.getElementById("tBody");
        data.player.forEach((player) => {
          const tr = document.createElement("tr");
          const th = document.createElement("th");
          const tdName = document.createElement("td");
          const tdGoals = document.createElement("td");
          const tdBlocks = document.createElement("td");
          const tdAssists = document.createElement("td");
          const tdPointsPlayed = document.createElement("td");
          const tdEditPlayer = document.createElement("td");

          tdEditPlayer.innerHTML = `<button onclick="populateModal(this)" type="button" data-toggle="modal"
           data-target="#editPlayerModal" class="btn btn-primary" data-goals=${player.player_goals} 
           data-assists=${player.player_assists} data-name="${player.player_name}" 
           data-num=${player.player_num} data-blocks=${player.player_blocks} data-points=${player.points_played}>Edit Player</button>`;
          th.innerText = player.player_num;
          tdName.innerText = player.player_name;
          tdBlocks.innerText = player.player_blocks;
          tdAssists.innerText = player.player_assists;
          tdGoals.innerText = player.player_goals;
          tdPointsPlayed.innerText = player.points_played;

          tr.append(
            th,
            tdName,
            tdGoals,
            tdAssists,
            tdBlocks,
            tdPointsPlayed,
            tdEditPlayer
          );
          tBody.append(tr);
        });
        document.querySelector("section.section").style.display = "block";
      }
    });
});

document.getElementById("form12").value = localStorage.getItem(
  window.location.href.split("=").pop()
);

if (document.getElementById("form12").value) {
  document.getElementById("submitPass").click();
}

function populateModal(element) {
  document.getElementById("playerModalInfo").textContent =
    "#" +
    element.getAttribute("data-num") +
    " " +
    element.getAttribute("data-name");
  document.getElementById("modalGoals").value =
    element.getAttribute("data-goals");
  document.getElementById("modalAssists").value =
    element.getAttribute("data-assists");
  document.getElementById("modalBlocks").value =
    element.getAttribute("data-blocks");
  document.getElementById("modalPoints_played").value =
    element.getAttribute("data-points");
}
const additionButtons = document.querySelectorAll(
  "#editPlayerModal .btn-success"
);
additionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById(button.getAttribute("data-target")).value =
      parseInt(
        document.getElementById(button.getAttribute("data-target")).value
      ) + 1;
  });
});

const subtractButtons = document.querySelectorAll(
  "#editPlayerModal .btn-danger"
);
subtractButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      parseInt(
        document.getElementById(button.getAttribute("data-target")).value
      ) > 0
    ) {
      document.getElementById(button.getAttribute("data-target")).value =
        parseInt(
          document.getElementById(button.getAttribute("data-target")).value
        ) - 1;
    }
  });
});
document.getElementById("saveStatButton").addEventListener("click", (event) => {
  event.preventDefault();
  const playerTitle = document
    .getElementById("playerModalInfo")
    .textContent.split(" ");
  playerTitle.shift();
  const player_name = playerTitle.join(" ");
  const player_num = document
    .getElementById("playerModalInfo")
    .textContent.split(" ")[0]
    .substring(1);
  const school_id = window.location.href.split("=").pop();
  const goals = document.getElementById("modalGoals").value;
  const assists = document.getElementById("modalAssists").value;
  const blocks = document.getElementById("modalBlocks").value;
  const points_played = document.getElementById("modalPoints_played").value;

  const player = {
    player_name,
    player_num,
    goals,
    assists,
    blocks,
    points_played,
    school_id,
  };
  fetch("/api/players", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "success") {
        document.location.reload();
      }
    });
});
