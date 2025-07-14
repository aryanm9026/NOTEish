async function postData(url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let someData = await response.json();
    return someData;
  } catch (error) {
    console.error("Error:", error);
  }
}

const fetchNotes = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.email) {
    document.querySelector(".login-signup").innerHTML = `<button
            type="button"
            class="btn btn-primary"
            id = "signout"
            style="background-color: #365cc3;"
          >
            Sign Out
          </button>`;
    let noteContainer = document.querySelector(".prev-notes");
    noteContainer.innerHTML = "";

    const signoutBtn = document.getElementById("signout");

    signoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "/login";
    });

    const notes = postData("/getNotes", { user: user.email });
    notes.then((response) => {
      console.log("Notes", response);
      //populating them notes logic
      response.notes.forEach((element) => {
        let transcribedMsg = encodeURIComponent(
          `*${element.title}*\n${element.desc}`
        );
        let note = `<div class="card note-card" data-title="${element.title}" data-desc="${element.desc}" data-id="${element._id}" >
              <div class="close-button">
              <button type="button" class="del-button" id="${element._id}" data-id="${element._id}" ria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
              </svg>
              </button>
              <span style="width: 10px"></span>
              <a id="shareButton" rel="noopener noreferrer" href="https://wa.me/?text=${transcribedMsg}" class="btn-close" aria-label="Share">
              <svg xmlns="http://www.w3.org/2000/svg" height="21px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z"/></svg>
              </a>
              </div>
              <div class="card-body">
              <h5 class="card-title ${element.id}">${element.title}</h5>
              <p class="card-text note-content ${element.id}">${element.desc}</p>
              </div>
              </div>`;
        noteContainer.innerHTML += note;
      });

      //delete logic
      document.addEventListener("click", function (e) {
        if (e.target.closest(".del-button")) {
          const delId = e.target.closest(".del-button").dataset.id;
          const confirmDelete = confirm(
            "Are you sure you want to delete this note?"
          );
          if (confirmDelete) {
            fetch(`/deleteNote/${delId}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  location.reload();
                } else {
                  alert("Failed to delete note.");
                }
              });
          }
        }
      });

      //expand logic
      noteContainer.addEventListener("click", (e) => {
        const card = e.target.closest(".note-card");
        const title = card.dataset.title;
        const desc = card.dataset.desc;
        const id = card.dataset.id;

        if (!card) return;

        document.querySelector(".popupcard").classList.toggle("expand");
        document.querySelector("main").classList.toggle("active-modal");
        document.querySelector("footer").classList.toggle("active-modal");
        document.querySelector("header").classList.toggle("active-modal");

        document.querySelector(".popupcard").innerHTML = `
            <div class="popup-header">
              <textarea name="title" readonly=true
            id="edit-title" class="popup-title ${id}">${title}</textarea>
              <div class="popup-buttons">
              <button id="popup-button" class="cross-button">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" border-radius="100%" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
              </svg>
              </button>
              <button id="popup-button" class="del-button" data-id="${id}" ria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
              </button>
              <button id="popup-button" class="edit-button">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
              </button>
              </div>
            </div>
            <div class="popup-body">
              <textarea name="note-entry"
              id="edit-note" readonly=true class="popup-text ${id}">${desc}</textarea>
            </div>
              `;

        //impand logic
        document
          .querySelector(".cross-button", ".cross-button svg")
          .addEventListener("click", () => {
            document.querySelector(".popupcard").classList.toggle("expand");

            document.querySelector("main").classList.toggle("active-modal");
            document.querySelector("footer").classList.toggle("active-modal");
            document.querySelector("header").classList.toggle("active-modal");
          });

        //edit logic
        document.querySelector(".edit-button").addEventListener("click", () => {
          document.querySelector("#edit-title").removeAttribute("readonly");
          document.querySelector("#edit-note").removeAttribute("readonly");
          let textarea = document.querySelector("#edit-note");
          textarea.focus();
          textarea.selectionStart = textarea.selectionEnd =
            textarea.value.length;
          document.querySelector(".popup-buttons").innerHTML = `
          <button id="popup-button" class="cross-button">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" border-radius="100%" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
              </svg>
              </button>
              <button id="popup-button" class="del-button" data-id="${id}" ria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
              </button>
              
          <button id="popup-save-button" data-id="${id}" type="button" style="width: 100px;height: 40px;font-weight: bolder;" class="btn btn-success">Save</button>
          `;
          document
            .querySelector("#popup-save-button")
            .addEventListener("click", async () => {
              let newNote = document.querySelector("#edit-note").value;
              let newTitle = document.querySelector("#edit-title").value;
              let dataID =
                document.querySelector("#popup-save-button").dataset.id;
              console.log(
                "Data submitted !",
                dataID,
                ",",
                newTitle,
                ",",
                newNote
              );
              const res = await fetch(`/editNote`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  _id: dataID,
                  title: newTitle,
                  desc: newNote,
                }),
              });
              if (res.ok) {
                location.reload();
              } else {
                alert("Failed to update note.");
              }
            });
        });
      });
    });
  } else {
    document.querySelector(".login-signup").innerHTML = `
          <button
            type="button"
            class="btn btn-primary"
            onclick="window.location.href='http://localhost:3000/login'"
            style="background-color: #365cc3;"
          >
            Login
          </button>
          <button
            type="button"
            class="btn btn-light"
            onclick="window.location.href='http://localhost:3000/signup'"
            style="background-color: #365cc3;"
          >
            Sign Up
          </button>
          `;
    window.location.href = "/login";
  }
};

fetchNotes();

let submit = document.getElementById("take-entry");
submit.addEventListener("click", async () => {
  let title = document.getElementById("title").value;
  let desc = document.getElementById("new-note").value;
  let email = JSON.parse(localStorage.getItem("user"))?.email;
  console.log("Data submitted !", title, ",", desc, ",", email);
  let resp = await postData("/addNote", { title, desc, email });
  console.log(resp);
  if (resp.success) {
    document.getElementById("title").value = "";
    document.getElementById("new-note").value = "";
    fetchNotes();
  }
});
