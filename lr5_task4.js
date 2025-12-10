const imagesArray = [
    {
        path: "images/lakers.jpg",
        title: "Los Angeles Lakers",
        description: "Одна з найтитулованіших команд НБА."
    },
    {
        path: "images/warriors.jpg",
        title: "Golden State Warriors",
        description: "Команда з динамічним стилем і великою історією успіхів."
    },
    {
        path: "images/bulls.jpg",
        title: "Chicago Bulls",
        description: "Легендарна ера 90-х зробила цю команду символом баскетболу."
    }
];

function initPhotoRotator(containerId, images) {
    const container = document.getElementById(containerId);
    if (!container || !Array.isArray(images) || images.length === 0) return;

    let currentIndex = 0;

    const wrapper = document.createElement("div");
    wrapper.className = "rotator-wrapper";

    const header = document.createElement("div");
    header.className = "rotator-header";

    const stage = document.createElement("div");
    stage.className = "rotator-stage";

    const navLeft = document.createElement("div");
    navLeft.className = "rotator-nav";

    const navRight = document.createElement("div");
    navRight.className = "rotator-nav";

    const linkPrev = document.createElement("a");
    linkPrev.className = "rotator-link";
    linkPrev.href = "#";
    linkPrev.textContent = "Назад";

    const linkNext = document.createElement("a");
    linkNext.className = "rotator-link";
    linkNext.href = "#";
    linkNext.textContent = "Вперед";

    navLeft.appendChild(linkPrev);
    navRight.appendChild(linkNext);

    const imgWrapper = document.createElement("div");
    imgWrapper.className = "rotator-image-wrapper";

    const img = document.createElement("img");
    imgWrapper.appendChild(img);

    stage.appendChild(navLeft);
    stage.appendChild(imgWrapper);
    stage.appendChild(navRight);

    const footer = document.createElement("div");
    footer.className = "rotator-footer";

    const titleEl = document.createElement("div");
    titleEl.className = "rotator-title";

    const descEl = document.createElement("div");
    descEl.className = "rotator-description";

    footer.appendChild(titleEl);
    footer.appendChild(descEl);

    wrapper.appendChild(header);
    wrapper.appendChild(stage);
    wrapper.appendChild(footer);

    container.appendChild(wrapper);

    function updateView() {
        const item = images[currentIndex];

        img.src = item.path;
        img.alt = item.title;

        header.textContent = `Фотографія ${currentIndex + 1} з ${images.length}`;
        titleEl.textContent = item.title;
        descEl.textContent = item.description;

        if (currentIndex === 0) {
            linkPrev.classList.add("hidden");
        } else {
            linkPrev.classList.remove("hidden");
        }

        if (currentIndex === images.length - 1) {
            linkNext.classList.add("hidden");
        } else {
            linkNext.classList.remove("hidden");
        }
    }

    linkPrev.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentIndex > 0) {
            currentIndex--;
            updateView();
        }
    });

    linkNext.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateView();
        }
    });

    updateView();
}

document.addEventListener("DOMContentLoaded", () => {
    initPhotoRotator("rotator", imagesArray);
});
