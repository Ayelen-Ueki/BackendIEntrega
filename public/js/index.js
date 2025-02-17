//To handle cliengt input on websocket form
const socket = io();

const main = () =>{
    //Product history
    socket.on("products list", (products)=>{
        const productsList = document.getElementById("productsList");
        products.forEach(({title, description, code, price, status, stock, category, image}) => {
            productsList.innerHTML += `<ul style="list-style-type: none">
            <li>${title}</li>
            <li>${description}</li>
            <li>${code}</li>
            <li>$${price}</li>
            <li>${status}</li>
            <li>${stock}</li>
            <li>${category}</li>
            <li>
                <img src="${image}" alt="${title}" width="100" height="100">
            </li>
            <br><br>
        </ul>`
        });
    })

    const productSocketForm = document.getElementById("productSocketForm");
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const code = document.getElementById("code");
    const price = document.getElementById("price");
    const status = document.getElementById("status");
    const stock = document.getElementById("stock");
    const category = document.getElementById("category");
    const image = document.getElementById("image");

    productSocketForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = title.value;
        const description = description.value;
        const code = code.value;
        const price = price.value;
        const status = status.checked;
        const stock = stock.value;
        const category = category.value;
        const image = image.value;

        title.value = "";
        description.value = "";
        code.value = "";
        price.value = "";
        status.value = false;
        stock.value = "";
        category.value = "";
        image.value = "";

        socket.emit("new product", {title, description, code, price, status, stock, category, image})
    });

    socket.on("broadcast new product", ({title, description, code, price, status, stock, category, image})=>{
        //Enviamos los mensajes al html
        const productsList = document.getElementById("product list");
        productsList.innerHTML += `<ul style="list-style-type: none">
        <li>${title}</li>
        <li>${description}</li>
        <li>${code}</li>
        <li>$${price}</li>
        <li>${status}</li>
        <li>${stock}</li>
        <li>${category}</li>
        <li>
            <img src="${image}" alt="${title}" width="100" height="100">
        </li>
        <br><br>
    </ul>`
    });
};

main();