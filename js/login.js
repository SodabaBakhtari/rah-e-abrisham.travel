window.onload = () => {

    const getCookie = (username) => {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === username) return value;
        }
        return null;
    };

    const cookieUser = getCookie("username");
    const sessionUser = sessionStorage.getItem("username");

    if (cookieUser || sessionUser) {
        const user = cookieUser || sessionUser;
        alert("Welcome dear " + user);
    } else {
        alert("Please login first");
        window.location.href = "index.html";
        return;
    }

    function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 2020 00:00:00 UTC; path=/`;
   }
    const logoutBtn = document.querySelector(".log-out");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            sessionStorage.removeItem("username");
            deleteCookie("username");
            alert("You have been logged out.");
            window.location.href = "index.html";
        });
    }
};
