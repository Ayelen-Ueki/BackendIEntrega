const selector = document.querySelector("#opts");
const token = localStorage.getItem("token");

// Change the navbar depending on user signed in/out

const isOnline = async () => {
  try {
    if (token) {
      const opts = {
        method: "POST",
        heathers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const url = "/api/auth/online";
      let response = await fetch(url, opts);
      response = await response.json();
      if (response.user_id) {
        selector.innerHTML = `
            <a class="btn btn-success py-1 px-2 m-1" href="/profile/${response.user_id}">Profile</a>
            <a class="btn btn-success py-1 px-2 m-1" href="/cart/${response.user_id}">Cart</a>
            <button class="btn btn-success py-1 px-2 m-1" id="signout">Sign out</button>
        `;
        document
          .querySelector("#signout")
          .addEventListener("click", async () => {
            try {
              const opts = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              };
              const url = "/api/auth/signout";
              await fetch(url, opts);
              localStorage.removeItem("token");
              location.replace("/");
            } catch (error) {
              console.log(error);
            }
          });
      }
    } else {
      selector.innerHTML = `
            <a class="btn btn-success py-1 px-2 m-1" href="/register">Register</a>
            <a class="btn btn-success py-1 px-2 m-1" href="/login">Login</a>
        `;
    }
  } catch (error) {
    console.log(error);
  }
};

isOnline();
