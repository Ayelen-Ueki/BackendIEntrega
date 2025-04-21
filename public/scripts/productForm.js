document
  .querySelector("#productForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const form = document.querySelector("#productForm");
      const formData = new FormData(form);

      const options = {
        method: "POST",
        body: formData,
      };

      const url = "http://localhost:8080/api/products/";
      let response = await fetch(url, options);
      response = await response.json();
      console.log(response);

      if (response.error) {
        alert(`Error: ${response.error}`);
      } else {
        alert("Product successfully added!");
        location.reload();
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An unexpected error occurred.");
    }
  });
