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

    // =========================
    // UPDATED PRICING
    // =========================
    const PRICES = {
        "Small Tubz": 65,
        "Big Tubz": 85
    };

    // =========================
    // SPECIAL COMBO DEALS
    // =========================
    const COMBOS = [
        {
            name: "3 Small Tubz",
            condition: (size, qty) => size === "Small Tubz" && qty === 3,
            price: 160
        },
        {
            name: "4 Small Tubz + 2 Big Tubz",
            condition: (size, qty, bigQty = 0) =>
                size === "Mixed Combo" && qty === 6,
            price: 399
        }
    ];

    const MAX_TYPES = 8;
    const MAX_TUBS = 6;

    let selectedSweets = [];
    let tubQuantity = 1;

    // =========================
    // UPDATE SUMMARY
    // =========================
    function updateSummary() {

        selectedList.innerHTML = "";

        selectedSweets.forEach((sweet, index) => {

            const li = document.createElement("li");

            li.innerHTML = `
                <div class="selected-item">
                    <span>🍬 ${sweet}</span>
                    <button class="remove-sweet" data-index="${index}">
                        ✕
                    </button>
                </div>
            `;

            selectedList.appendChild(li);
        });

        // REMOVE BUTTONS
        document.querySelectorAll(".remove-sweet").forEach(btn => {
            btn.addEventListener("click", () => {

                const index = parseInt(btn.dataset.index);

                const removedSweet = selectedSweets[index];

                selectedSweets.splice(index, 1);

                sweetOptions.forEach(li => {
                    if (li.dataset.name === removedSweet) {
                        li.classList.remove("selected");
                    }
                });

                updateSummary();
            });
        });

        // =========================
        // EMPTY STATE
        // =========================
        if (selectedSweets.length === 0) {

            summary.style.display = "none";

            return;
        }

        summary.style.display = "block";

        // =========================
        // DETERMINE TUB SIZE
        // =========================
        const tubSize =
            selectedSweets.length <= 4
                ? "Small Tubz"
                : "Big Tubz";

        const basePrice = PRICES[tubSize];

        // =========================
        // COMBO DETECTION
        // =========================
        let totalPrice = basePrice * tubQuantity;
        let comboText = "";

        if (tubSize === "Small Tubz" && tubQuantity === 3) {

            totalPrice = 160;

            comboText = `
                <div class="combo-deal">
                    ✨ Combo Deal Applied: 3 Small Tubz Special
                </div>
            `;
        }

        // =========================
        // UPDATE UI
        // =========================
        tubSizeEl.innerHTML = `
            <span class="summary-label">Tub Size:</span>
            <span class="summary-value">${tubSize}</span>
        `;

        totalPriceEl.innerHTML = `
            <span class="summary-label">Total:</span>
            <span class="summary-price">R${totalPrice}</span>
            ${comboText}
        `;

        tubQuantityEl.textContent = tubQuantity;

        // =========================
        // GLOW EFFECT
        // =========================
        summary.classList.add("pulse");

        setTimeout(() => {
            summary.classList.remove("pulse");
        }, 400);
    }

    // =========================
    // SWEET SELECTION
    // =========================
    sweetOptions.forEach(li => {

        li.addEventListener("click", () => {

            const name = li.dataset.name;

            // REMOVE SWEET
            if (selectedSweets.includes(name)) {

                selectedSweets = selectedSweets.filter(s => s !== name);

                li.classList.remove("selected");
            }

            // ADD SWEET
            else {

                if (selectedSweets.length >= MAX_TYPES) {

                    showCandyAlert(
                        `🍭 Maximum of ${MAX_TYPES} sweet types allowed!`
                    );

                    return;
                }

                selectedSweets.push(name);

                li.classList.add("selected");
            }

            updateSummary();
        });
    });

    // =========================
    // QUANTITY BUTTONS
    // =========================
    minusTubsBtn.addEventListener("click", () => {

        if (tubQuantity > 1) {

            tubQuantity--;

            updateSummary();
        }
    });

    plusTubsBtn.addEventListener("click", () => {

        if (tubQuantity < MAX_TUBS) {

            tubQuantity++;

            updateSummary();
        }
        else {

            showCandyAlert(
                `🍬 Maximum order is ${MAX_TUBS} tubz!`
            );
        }
    });

    // =========================
    // WHATSAPP ORDER
    // =========================
    orderBtn.addEventListener("click", () => {

        if (selectedSweets.length === 0) {

            showCandyAlert(
                "🍭 Please select at least one sweet!"
            );

            return;
        }

        const tubSize =
            selectedSweets.length <= 4
                ? "Small Tubz"
                : "Big Tubz";

        let totalPrice = PRICES[tubSize] * tubQuantity;

        // SPECIAL DEAL
        if (tubSize === "Small Tubz" && tubQuantity === 3) {
            totalPrice = 160;
        }

        // =========================
        // BUILD MESSAGE
        // =========================
        let message = `
🍬 *CANDIDREAMZ ORDER* 🍬

✨ Tub Size:
${tubSize}

📦 Quantity:
${tubQuantity}

🍭 Selected Sweetz:
`;

        selectedSweets.forEach(sweet => {
            message += `• ${sweet}\n`;
        });

        message += `
💰 Total:
R${totalPrice}

🍓 Thank you!
`;

        const whatsappURL =
            "https://wa.me/27677327559?text=" +
            encodeURIComponent(message);

        window.open(whatsappURL, "_blank");
    });

    // =========================
    // CUSTOM ALERT
    // =========================
    function showCandyAlert(message) {

        const alert = document.createElement("div");

        alert.className = "candy-alert";

        alert.innerHTML = message;

        document.body.appendChild(alert);

        setTimeout(() => {
            alert.classList.add("show");
        }, 10);

        setTimeout(() => {

            alert.classList.remove("show");

            setTimeout(() => {
                alert.remove();
            }, 300);

        }, 2500);
    }

});