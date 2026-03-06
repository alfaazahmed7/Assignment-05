let currentStatus = "tab-all";

// toggle button logic
function switchTab(id) {

    const tabs = ["tab-all", "tab-open", "tab-closed"];

    tabs.forEach(tab => {
        const el = document.getElementById(tab);
        el.classList.remove("bg-[#4a00ff]");
        el.classList.add("bg-gray-500");
    });

    const selected = document.getElementById(id);
    currentStatus = id;
    selected.classList.remove("bg-gray-500");
    selected.classList.add("bg-[#4a00ff]");
}
switchTab(currentStatus);