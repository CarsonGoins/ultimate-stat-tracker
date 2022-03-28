document.getElementById("addPlayerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const player_name = document.getElementById("playerName").value;
  const player_num = document.getElementById("playerNum").value;
  const school_id = "2";

  const newPlayer = {
    player_name,
    player_num,
    school_id
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
      window.location.href = data.redirectTo;
    });
  //   (async () => {
  //     const rawResponse = await fetch("/api/teams", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newSchool),
  //     });
  //     const content = await rawResponse.json();

  //     console.log(content);
  //   })();
});

// document.getElementById("submitPass").addEventListener("click", (event) => {
//   const passInput = document.getElementById("form12").value;

//   localStorage.setItem(window.location.href.split("=").pop(), passInput); //storing team id and password locally

//   fetch("/api/team-password", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       password: localStorage.getItem(window.location.href.split("=").pop()),
//       id: parseInt(window.location.href.split("=").pop()),
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       if (data.message) {
//         alert(data.message);
//       } else {
//         document.getElementById("rosterRow").innerHTML = `
//         <table class="table">
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Name</th>
//               <th scope="col">Goals</th>
//               <th scope="col">Assists</th>
//               <th scope="col">Blocks</th>
//               <th scope="col">Points Played</th>
//             </tr>
//           </thead>
//           <tbody id="tBody">
//           </tbody>
//         </table>`;
//         const tBody = document.getElementById("tBody");
//         data.player.forEach((player) => {
//           const tr = document.createElement("tr");
//           const th = document.createElement("th");
//           const tdName = document.createElement("td");
//           const tdGoals = document.createElement("td");
//           const tdBlocks = document.createElement("td");
//           const tdAssists = document.createElement("td");
//           const tdPointsPlayed = document.createElement("td");

//           th.innerText = player.player_num;
//           tdName.innerText = player.player_name;
//           tdBlocks.innerText = player.player_blocks;
//           tdAssists.innerText = player.player_assists;
//           tdGoals.innerText = player.player_goals;
//           tdPointsPlayed.innerText = player.points_played;

//           tr.append(th, tdName, tdGoals, tdAssists, tdBlocks, tdPointsPlayed);
//           tBody.append(tr);
//         });
//         // document.getElementById("addPlayerForm").addEventListener("submit", (event) => {
//         //   event.preventDefault();
//         //   const playerName = document.getElementById("playerName").value;
//         //   const jerseyNum = document.getElementById("playerNum").value;

//         //   const newPlayer = {
//         //     playerName,
//         //     jerseyNum
//         //   }

//         //   fetch("/api/players", {
//         //     method: "POST",
//         //     headers: {
//         //       Accept: "application/json",
//         //       "Content-Type": "application/json",
//         //     },
//         //     body: JSON.stringify(newPlayer),
//         //   })
//         // });
//         // document.getElementById(tBody).
//       }
//     });
// });

// document.getElementById("form12").value = localStorage.getItem(
//   window.location.href.split("=").pop()
// );
