const fetchProducts = async () => {
  try {
    const url = "/api/products";
    const response = await fetch(url, { method: "GET" });
    const products = await response.json();

    if (products.length === 0) {
      alert("No products found!");
      return;
    }

    const container = document.querySelector("#productsList");

    container.innerHTML = "";

    products.forEach((product) => {
      const productHTML = `
        <div class="col-3 mb-4">
            <div class="card" style="width: 100%;">
                <img class="card-img-top" src="${product.image}" alt="${product.title}">
                <div class="card-body">
                    <h2>
                        <a style="text-decoration: none; color: brown;" href="/api/products/${product._id}">
                            ${product.title}
                        </a>
                    </h2>
                    <p>${product.description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Price: $${product.price}</li>
                    <li class="list-group-item">Available stock: ${product.stock}</li>
                    <li class="list-group-item">Category: ${product.category}</li>
                </ul>
            </div>
        </div>
      `;

      container.innerHTML += productHTML;
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    alert("Something went wrong while fetching products.");
  }
};

document.addEventListener("DOMContentLoaded", fetchProducts);
