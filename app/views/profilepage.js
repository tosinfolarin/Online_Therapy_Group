document.querySelectorAll(".nav ul li").forEach(function(element) {
    element.addEventListener("click", function() {
        document.querySelectorAll(".nav ul li").forEach(function(el) {
            el.classList.remove("active");
        });
        this.classList.add("active");

        const index = Array.from(this.parentNode.children).indexOf(this);
        tabs(index);
    });
});

const tabBtn = document.querySelectorAll(".nav ul li");
const tab = document.querySelectorAll(".tab");

function tabs(panelIndex) {
    tab.forEach(function(node) {
        node.style.display = "none";
    });
    tab[panelIndex].style.display = "block";
}
tabs(0);

const bio = document.querySelector(".bio");
const bioMore = document.querySelector("#see-more-bio");
const bioLength = bio.innerText.length;

function bioText() {
    bio.oldText = bio.innerText;

    bio.innerText = bio.innerText.substring(0, 100) + "...";
    bio.innerHTML += <span onclick='addLength()' id='see-more-bio'>See More</span>;
}
bioText();

function addLength() {
    bio.innerText = bio.oldText;
    bio.innerHTML +=
        "&nbsp;" + <span onclick='bioText()' id='see-less-bio'>See Less</span>;
    document.getElementById("see-less-bio").addEventListener("click", () => {
        document.getElementById("see-less-bio").style.display = "none";
    });
}

if (document.querySelector(".alert-message").innerText.length > 9) {
    document.querySelector(".alert-message").style.fontSize = ".7rem";
}