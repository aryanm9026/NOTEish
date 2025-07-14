document.addEventListener("DOMContentLoaded", () => {
  const newNote = document.querySelector("#new-note");
  const entryBox = document.querySelector(".entrybox");
  let idleTimer;

  if (!newNote || !entryBox) return;

  // Function to contract the box
  const contractBox = () => {
    if (newNote.value.trim() === "") {
      entryBox.style.height = "175px";
      newNote.style.height = "45px";
    }
  };

  newNote.addEventListener("input", () => {
    entryBox.style.height = "600px";
    newNote.style.height = "500px";

    clearTimeout(idleTimer);
    idleTimer = setTimeout(contractBox, 3000);
  });

  newNote.addEventListener("blur", () => {
    setTimeout(contractBox, 500);
  });
});
