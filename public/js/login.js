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

let submit = document.getElementById("submit");
submit.addEventListener("click", async () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  console.log("Data submitted !", email, ",", password);
  let resp = await postData("/login", { email, password });
  console.log(resp);
  if (resp.success) {
    window.location.href = "http://localhost:3000/";
    localStorage.setItem("user", JSON.stringify(resp.user));
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }
});
