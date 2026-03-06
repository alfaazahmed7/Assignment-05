let currentStatus = "tab-all";
const cartContainer = document.getElementById("cart-container");

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
}
switchTab(currentStatus);

async function loadCarts() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    showCarts(data.data);
}

function showCarts(carts) {
    console.log(carts); 
    cartContainer.innerHTML = "";

    carts.forEach(cart => { 
        const card = document.createElement("div");
        card.className = "p-4 bg-white rounded-lg h-full";
        card.innerHTML = `
        <div class="flex justify-between items-center mb-3">
                <img src="./assets/Open-Status.png" alt="">
                <span class="bg-[#FEECEC] text-[#EF4444] py-1 px-4 font-medium rounded-lg text-[14px]">${cart.priority}</span>
            </div>
            <div class="mb-2">
                <p class="text-[18px] font-semibold text-[#1F2937]">${cart.title}</p>
            </div>
            <div class="mb-3">
                <p class="text-[14px] text-[#64748B] line-clamp-2">${cart.description} 
                </p>
            </div>
            <div class="flex justify-between items-center">
                <span class="bg-[#FECACA] text-[#EF4444] text-[14px] rounded-lg py-1 px-3"><i class="fa-solid fa-bug"
                        style="color: rgb(255, 7, 7);"></i> ${cart.labels[0]}</span>
                <span class="bg-[#FDE68A] py-1 px-2 rounded-lg text-[14px] text-[#D97706] font-medium"><i
                        class="fa-regular fa-circle-dot" style="color: rgb(177, 162, 26);"></i> ${cart.labels[1]}</span>
            </div>
            <div class="py-5">
                <hr class=" text-[#E4E4E7]">
            </div>
            <div class="my-4">
                <p class="text-[14px] text-[#64748B]">${cart.assignee}</p>
                <p class="text-[14px] text-[#64748B]">${cart.updatedAt}</p>
            </div>
        `;
        cartContainer.appendChild(card);
    });
}
loadCarts();
showCarts();