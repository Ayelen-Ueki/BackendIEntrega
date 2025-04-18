document.querySelector("#login").addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const url = "api/auth/login";
    let response = await fetch(url, opts);
    response = await response.json();
    if (response.error) {
      alert(response.error);
    } else {
      //token handling
      localStorage.setItem("token", response.response);
      location.replace("/");
    }
  } catch (error) {
    alert(error.error);
  }
});
