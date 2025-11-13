document.addEventListener("DOMContentLoaded", () => {
    const sweetOptions = document.querySelectorAll("#sweet-options li");
    const selectedList = document.getElementById("selected-sweets");
    const summary = document.getElementById("order-summary");
    const tubSizeEl = document.getElementById("tub-size");
    const totalPriceEl = document.getElementById("total-price");
    const orderBtn = document.getElementById("order-btn");
    const minusTubsBtn = document.getElementById("minus-tubs");
    const plusTubsBtn = document.getElementById("plus-tubs");
    const tubQuantityEl = document.getElementById("tub-quantity");

    const PRICES = { "Small Tub": 65, "Big Tub": 95 };
    const MAX_TUBS = 6;

    let selectedSweets = [];
    let tubQuantity = 1;

    function updateSummary() {
        selectedList.innerHTML = "";
        selectedSweets.forEach(s => {
            const li = document.createElement("li");
            li.textContent = s;
            selectedList.appendChild(li);
        });

        if (selectedSweets.length > 0) {
            summary.style.display = "block";

            const tubSize = selectedSweets.length <= 4 ? "Small Tub" : "Big Tub";
            tubSizeEl.textContent = `Tub Size: ${tubSize}`;
            totalPriceEl.textContent = `Total Price: R${PRICES[tubSize] * tubQuantity}`;
        } else {
            summary.style.display = "none";
        }

        tubQuantityEl.textContent = tubQuantity;
    }

    sweetOptions.forEach(li => {
        li.addEventListener("click", () => {
            const name = li.dataset.name;
            if (selectedSweets.includes(name)) {
                selectedSweets = selectedSweets.filter(s => s !== name);
                li.classList.remove("selected");
            } else {
                const maxTypes = 8; // Big Tub max
                if (selectedSweets.length >= maxTypes) {
                    alert(`You can select up to ${maxTypes} types of sweets.`);
                    return;
                }
                selectedSweets.push(name);
                li.classList.add("selected");
            }
            updateSummary();
        });
    });

    minusTubsBtn.addEventListener("click", () => {
        if (tubQuantity > 1) tubQuantity--;
        updateSummary();
    });
    plusTubsBtn.addEventListener("click", () => {
        if (tubQuantity < MAX_TUBS) tubQuantity++;
        updateSummary();
    });

    orderBtn.addEventListener("click", () => {
        if (selectedSweets.length === 0) {
            alert("Please select at least one sweet!");
            return;
        }

        const tubSize = selectedSweets.length <= 4 ? "Small Tub" : "Big Tub";
        let message = `Hello! I would like to order:\nTub Size: ${tubSize}\nQuantity: ${tubQuantity}\nSweets:\n`;
        selectedSweets.forEach(s => message += `- ${s}\n`);
        message += `\nTotal Price: R${PRICES[tubSize] * tubQuantity}\nThank you!`;

        const whatsappURL = "https://wa.me/27677327559?text=" + encodeURIComponent(message);
        window.open(whatsappURL, "_blank");
    });
});