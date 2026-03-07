let currentStatus = "tab-all";
const allContainer = document.getElementById("all-cart-container");
const openContainer = document.getElementById("open-cart-container");
const closedContainer = document.getElementById("closed-cart-container");


// toggle button logic
function switchTab(id) {

    const tabs = ["tab-all", "tab-open", "tab-closed"];

    tabs.forEach(tab => {
        const el = document.getElementById(tab);
        el.classList.remove("bg-[#4a00ff]", "border-2", "border-[#4A00FF]", "text-white");
        el.classList.add("bg-white", "text-[#64748B]", "border-2", "border-[#E4E4E7]");
    });

    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.remove("bg-white", "text-[64748B]", "border-2", "border-[#E4E4E7]");
    selected.classList.add("bg-[#4a00ff]", "border-2", "border-[#4A00FF]", "text-white");


    // toggle buttons functionality to show carts
    if (currentStatus === "tab-all") {
        // loadCarts() function to display all carts
        async function loadCarts() {
            const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
            const data = await res.json();
            showCarts(data.data);
        }
        loadCarts();
    }

    if (currentStatus === "tab-open") {
        // loadOpenCarts() function to display only status:open carts
        async function loadOpenCarts() {
            const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
            const result = await res.json();

            const openIssues = result.data.filter(issue => issue.status === "open");
            showCarts(openIssues);

        }
        loadOpenCarts();
    }

    if (currentStatus === "tab-closed") {
        // loadClosedCarts() function to display only status:closed carts
        async function loadClosedCarts() {
            const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
            const result = await res.json();

            const closedIssues = result.data.filter(issue => issue.status === "closed");
            showCarts(closedIssues);

        }
        loadClosedCarts();
    }
}
switchTab(currentStatus);

// count function
function totalCount() {
    const totalCarts = document.getElementById("total-carts");
    const allCarts = allContainer.children.length;
    const updateTotalCarts = totalCarts.innerText = allCarts;
    // console.log(updateTotalCarts);
}

// // loadCarts() function to display all carts
// async function loadCarts() {
//     const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
//     const result = await res.json();
//     showCarts(data.data);
// }
// loadCarts();

function showCarts(carts) {
    console.log(carts);
    allContainer.innerHTML = "";

    carts.forEach(cart => {

        // card.className classes
        let cardClasses = "";

        if (cart.status === "open") {
            cardClasses = "border-t-4 border-t-[#00A96E]";
        }
        if (cart.status === "closed") {
            cardClasses = "border-t-4 border-t-[#A855F7]";
        }

        // cart.priority classes
        let priorityClass = "";

        if (cart.priority === "high") {
            priorityClass = "bg-[#FEECEC] text-[#EF4444]"
        }
        if (cart.priority === "medium") {
            priorityClass = "bg-[#FFF6D1] text-[#F59E0B]";
        }
        if (cart.priority === "low") {
            priorityClass = "bg-[#EEEFF2] text-[#9CA3AF]";
        }

        // cart.labels[0] classes
        let cartLabelsZeroIcon = "";
        let cartLabelsZero = "";

        if (cart.labels[0] === "bug") {
            cartLabelsZero = "bg-[#FECACA] text-[#EF4444]";
            cartLabelsZeroIcon = `<i class="fa-solid fa-bug" style="color: rgb(255, 83, 83);"></i>`;
        }
        if (cart.labels[0] === "enhancement") {
            cartLabelsZero = "bg-[#DEFCE8] text-[#00A96E]";
            cartLabelsZeroIcon = `<i class="fa-solid fa-wand-magic-sparkles" style="color: rgb(26, 178, 27);"></i>`;
        }
        if (cart.labels[0] === "documentation") {
            cartLabelsZero = "bg-[#CCE0FF] text-[#485696]";
            cartLabelsZeroIcon = `<i class="fa-solid fa-file-lines" style="color: rgb(112, 111, 247);"></i>`;
        }

        // cart.labels[1] classes
        let cartLabelsOneIcon = "";
        let cartLabelsOne = "";

        if (cart.labels[1] === "help wanted") {
            cartLabelsOne = "bg-[#FFF8DB] text-[#D97706]"
            cartLabelsOneIcon = `<i class="fa-solid fa-user-astronaut" style="color: rgb(216, 177, 91);"></i>`;

        }
        if (cart.labels[1] === "good first issue") {
            cartLabelsOne = "bg-red-200 text-[#2f3e46]"
            cartLabelsOneIcon = `<i class="fa-solid fa-circle-exclamation" style="color: rgb(244, 102, 102);"></i>`;
        }
        if (cart.labels[1] === "enhancement") {
            cartLabelsOne = "bg-[#DEFCE8] text-[#00A96E]"
            cartLabelsOneIcon = `<i class="fa-solid fa-wand-magic-sparkles" style="color: rgb(26, 178, 27);"></i>`;
        }

        // dynamic image
        let statusImage = "";

        if (cart.status === "open") {
            statusImage = "./assets/Open-Status.png"
        }
        if (cart.status === "closed") {
            statusImage = "./assets/Closed-Status.png"
        }

        const card = document.createElement("div");
        card.className = `${cardClasses} p-4 bg-white rounded-lg`;
        card.innerHTML = `
        <div class="flex justify-between items-center mb-3">
                <img src="${statusImage}" alt="">
                <span class="${priorityClass} py-1 px-4 font-medium rounded-lg text-[14px]">${cart.priority.toUpperCase()}</span>
            </div>
            <div class="mb-2">
                <p class="text-[16px] font-semibold text-[#1F2937] line-clamp-1">${cart.title}</p>
            </div>
            <div class="mb-3">
                <p class="text-[14px] text-[#64748B] line-clamp-2">${cart.description} 
                </p>
            </div>
            <div class="">
                <span class="${cartLabelsZero} text-[14px] rounded-lg py-1 px-3"> ${cartLabelsZeroIcon} ${cart.labels[0].toUpperCase()}</span>
                ${cart.labels[1] ? `
    <span class="${cartLabelsOne} py-1 px-2 rounded-lg text-[14px] font-medium">
        ${cartLabelsOneIcon} ${cart.labels[1].toUpperCase()}
    </span>
    ` : ""}
            </div>
            <div class="pt-5">
                <hr class=" text-[#E4E4E7]">
            </div>
            <div class="my-4">
                <p class="text-[14px] text-[#64748B]">${cart.assignee.toUpperCase()}</p>
                <p class="text-[14px] text-[#64748B]">${new Date(cart.updatedAt).toLocaleString("en-Us", { timeZone: "Asia/Jakarta" })}</p>
            </div>
        `;
        allContainer.appendChild(card);
        totalCount();
    });
}
showCarts();