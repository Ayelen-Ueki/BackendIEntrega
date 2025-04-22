document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#productDetail").forEach((link) => {
    link.addEventListener("click", async (event) => {
      event.preventDefault();
      const productId = event.target.getAttribute("href").split("/").pop();
      await loadProductDetails(productId);
    });
  });
});

const loadProductDetails = async (productId) => {
  try {
    const url = `/api/products/${productId}`;
    const response = await fetch(url);
    const product = await response.json();

    if (!product || product.error) {
      alert("Product not found!");
      return;
    }

    const container = document.querySelector("productDetail");
    container.innerHTML = `
            <div class="col-3 mb-4">
                <div class="card" style="width: 100%;">
                    <img class="card-img-top" src="${product.image}" alt="${product.title}">
                    <div class="card-body">
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Price: $${product.price}</li>
                        <li class="list-group-item">Available stock: ${product.stock}</li>
                        <li class="list-group-item">Category: ${product.category}</li>
                    </ul>
                    <button id="addToCart" class="btn btn-success">+ Cart</button>
                    <button id="editPtoduct" class="btn btn-warning">Edit</button>
                    <button id="deleteProduct" class="btn btn-danger">Delete</button>
                </div>
            </div>
        `;
  } catch (error) {
    console.error("Error fetching product details:", error);
    alert("An error occurred while fetching the product.");
  }
};

//Edit product
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#editPtoduct").forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button.id;
      const newTitle = prompt("Enter new title:");
      const newPrice = prompt("Enter new price:");
      if (!newTitle || !newPrice) return alert("Update canceled.");

      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newTitle,
            price: parseFloat(newPrice),
          }),
        });

        const result = await response.json();
        if (response.ok) {
          alert("Product updated successfully!");
          location.reload();
        } else {
          alert(`Error updating product: ${result.error}`);
        }
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Something went wrong.");
      }
    });
  });
});

//Delete product
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#deleteProduct").forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button.id;

      const newTitle = prompt("Enter new product name:");
      const newPrice = prompt("Enter new price:");
      if (!newTitle || !newPrice) return alert("Update canceled.");

      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newTitle,
            price: parseFloat(newPrice),
          }),
        });

        const result = await response.json();
        if (response.ok) {
          alert("Product updated successfully!");
          location.reload();
        } else {
          alert(`Error updating product: ${result.error}`);
        }
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Something went wrong.");
      }
    });
  });
});

//Add to cart
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#addToCart").forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button.id; // Product ID from button
      const userId = localStorage.getItem("user_id"); // Retrieve cart ID from storage or session

      if (!userId) {
        alert("No cart found! Please create or select a cart.");
        return;
      }

      try {
        // Send request to add the product to the specified cart
        const response = await fetch(`/api/carts/${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            product_id: productId,
            quantity: 1,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Product added to cart successfully!");
        } else {
          alert(`Error adding product to cart: ${result.error}`);
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
        alert("Something went wrong.");
      }
    });
  });
});
