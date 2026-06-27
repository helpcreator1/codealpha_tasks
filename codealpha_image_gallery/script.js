let images = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
    "img5.jpg",
    "img6.jpg",
    "img7.jpg",
    "img8.jpg",
    "img9.jpg"
];

let currentIndex = 0;

let lightbox = document.getElementById("lightbox");
let lightboxImg = document.getElementById("lightbox-img");
let galleryImages = document.querySelectorAll(".gallery img");
let filterButtons = document.querySelectorAll(".filter-buttons button");

function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "flex";
    lightboxImg.src = images[currentIndex];
}

function closeLightbox() {
    lightbox.style.display = "none";
}

function changeImage(direction) {
    currentIndex = currentIndex + direction;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    lightboxImg.src = images[currentIndex];
}

function filterImages(category) {
    for (let i = 0; i < galleryImages.length; i++) {
        let imageCategory = galleryImages[i].getAttribute("data-category");

        if (category === "all" || imageCategory === category) {
            galleryImages[i].classList.remove("hide");
        } else {
            galleryImages[i].classList.add("hide");
        }
    }

    for (let j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove("active");
    }

    event.target.classList.add("active");
}

document.addEventListener("keydown", function(event) {
    if (lightbox.style.display === "flex") {
        if (event.key === "ArrowRight") {
            changeImage(1);
        } else if (event.key === "ArrowLeft") {
            changeImage(-1);
        } else if (event.key === "Escape") {
            closeLightbox();
        }
    }
});

lightbox.addEventListener("click", function(event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});