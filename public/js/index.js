//To handle client input on websocket form
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
    const inputTitle = document.getElementById("formTitle");
    const inputDescription = document.getElementById("formDescription");
    const inputCode = document.getElementById("formCode");
    const inputPrice = document.getElementById("formPrice");
    const inputStatus = document.getElementById("formtatus");
    const inputStock = document.getElementById("formStock");
    const inputCategory = document.getElementById("formCategory");
    const inputImage = document.getElementById("formImage");

    productSocketForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newTitle = inputTitle.value;
        const newDescription = inputDescription.value;
        const newCode = inputCode.value;
        const newPrice = inputPrice.value;
        const newStatus = inputStatus.checked;
        const newStock = inputStock.value;
        const newCategory = inputCategory.value;
        const newImage = inputImage.value;

        inputTitle.value = "";
        inputDescription.value = "";
        inputCode.value = "";
        inputPrice.value = "";
        inputStatus.value = false;
        inputStock.value = "";
        inputCategory.value = "";
        inputImage.value = "";

        socket.emit("new product", {newTitle, newDescription, newCode, newPrice, newStatus, newStock, newCategory, newImage})
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