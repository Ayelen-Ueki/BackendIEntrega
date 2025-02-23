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
    const inputStatus = document.getElementById("formStatus");
    const inputStock = document.getElementById("formStock");
    const inputCategory = document.getElementById("formCategory");
    const inputImage = document.getElementById("formImage");

    productSocketForm.addEventListener("submit", async(event) => {
        event.preventDefault();
        const newTitle = inputTitle.value;
        const newDescription = inputDescription.value;
        const newCode = inputCode.value;
        const newPrice = inputPrice.value;
        const newStatus = inputStatus.checked ? 'true' : 'false';
        const newStock = inputStock.value;
        const newCategory = inputCategory.value;
        const file = inputImage.files[0];

        // Create a FormData object to send the image
        const formData = new FormData();
        formData.append('prodImg', file);

        // Upload the image to the server
        const response = await fetch('/realtimeproducts/upload', {
            method: 'POST',
            body: formData
        });

            // Inspect the raw response text
        const responseText = await response.text();
        console.log(responseText); // Log the raw response text

        try {
            const fileData = JSON.parse(responseText); // Parse the response text as JSON
            const newImage = fileData.path; // Get the image path
    
            // Reset form fields
            inputTitle.value = "";
            inputDescription.value = "";
            inputCode.value = "";
            inputPrice.value = "";
            inputStatus.checked = false;
            inputStock.value = "";
            inputCategory.value = "";
            inputImage.value = "";
    
            // Emit the new product details with image path
            socket.emit("new product", { newTitle, newDescription, newCode, newPrice, newStatus, newStock, newCategory, newImage });
        } catch (error) {
            console.error('Failed to parse JSON response:', error);
        }

    });

    socket.on("broadcast new product", ({title, description, code, price, status, stock, category, image})=>{
        //Enviamos los mensajes al html
        const productsList = document.getElementById("productsList");
        productsList.innerHTML += `<ul style="list-style-type: none">
        <li>${title}</li>
        <li>${description}</li>
        <li>${code}</li>
        <li>$${price}</li>
        <li>${status}</li>
        <li>${stock}</li>
        <li>${category}</li>
        <li><img src="${image}" alt="${title}" width="100" height="100"></li>
        <br><br>
        </ul>`;
    });
};

main();