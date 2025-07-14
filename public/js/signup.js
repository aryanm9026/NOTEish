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
  let confirmPassword = document.getElementById("confirm-password").value;
  let termsForm = document.getElementById("terms-check");
  if (confirmPassword === password) {
    if (termsForm.checked) {
      console.log("Data submitted !", email, ",", password);
      let resp = await postData("/signup", { email, password });
      console.log(resp);
      if (resp.success) {
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        window.location.href = "http://localhost:3000/";
      }
    } else {
      alert("Please check Terms and Conditions.");
    }
  } else {
    document.querySelector(".re-enter-pass").classList.toggle("enabled");
    setTimeout(
      () =>
        document.querySelector(".re-enter-pass").classList.toggle("enabled"),
      5000
    );
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirm-password").value = "";
  }
});
