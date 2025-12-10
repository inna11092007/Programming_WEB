const podcasts = [
    {
        title: "The Daily",
        author: "The New York Times",
        duration: 28,
        topic: "Новини",
        listened: true,
        markAsRead() { this.listened = true; },
        markAsListened() { this.listened = true; },
        info() {
            return `Назва: ${this.title}, Автор: ${this.author}, Тема: ${this.topic}, Тривалість: ${this.duration} хв, Прослухано: ${this.listened ? "Так" : "Ні"}`;
        }
    },
    {
        title: "Lex Fridman Podcast",
        author: "Lex Fridman",
        duration: 120,
        topic: "Технології",
        listened: false,
        markAsRead() { this.listened = true; },
        markAsListened() { this.listened = true; },
        info() {
            return `Назва: ${this.title}, Автор: ${this.author}, Тема: ${this.topic}, Тривалість: ${this.duration} хв, Прослухано: ${this.listened ? "Так" : "Ні"}`;
        }
    },
    {
        title: "Hidden Brain",
        author: "NPR",
        duration: 50,
        topic: "Психологія",
        listened: false,
        markAsRead() { this.listened = true; },
        markAsListened() { this.listened = true; },
        info() {
            return `Назва: ${this.title}, Автор: ${this.author}, Тема: ${this.topic}, Тривалість: ${this.duration} хв, Прослухано: ${this.listened ? "Так" : "Ні"}`;
        }
    }
];

function createPodcast(title, author, duration, topic, listened) {
    return {
        title,
        author,
        duration,
        topic,
        listened,
        markAsRead() { this.listened = true; },
        markAsListened() { this.listened = true; },
        info() {
            return `Назва: ${this.title}, Автор: ${this.author}, Тема: ${this.topic}, Тривалість: ${this.duration} хв, Прослухано: ${this.listened ? "Так" : "Ні"}`;
        }
    };
}

function calculateAverageDuration() {
    if (podcasts.length === 0) return 0;
    const sum = podcasts.reduce((acc, p) => acc + Number(p.duration), 0);
    return sum / podcasts.length;
}

function getListenedCount() {
    return podcasts.filter(p => p.listened).length;
}

function renderStats() {
    const totalEl = document.getElementById("totalCount");
    const listenedEl = document.getElementById("listenedCount");
    if (totalEl) totalEl.textContent = String(podcasts.length);
    if (listenedEl) listenedEl.textContent = String(getListenedCount());
}

function renderAverage() {
    const avgEl = document.getElementById("avgDuration");
    if (!avgEl) return;
    avgEl.textContent = podcasts.length ? `${calculateAverageDuration().toFixed(1)} хв` : "—";
}

function renderTable() {
    const tbody = document.getElementById("podcastsList");
    if (!tbody) return;
    tbody.innerHTML = "";

    podcasts.forEach((p, index) => {
        const tr = document.createElement("tr");

        const statusClass = p.listened ? "ok" : "no";
        const statusText = p.listened ? "Прослухано" : "Не прослухано";

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${p.title}</td>
            <td>${p.author}</td>
            <td>${p.topic}</td>
            <td>${p.duration} хв</td>
            <td><span class="status ${statusClass}">${statusText}</span></td>
            <td>
                ${p.listened ? "" : `<button class="row-btn" data-index="${index}">Позначити</button>`}
            </td>
        `;

        tbody.appendChild(tr);
    });

    tbody.querySelectorAll("button.row-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const i = Number(btn.dataset.index);
            if (!Number.isInteger(i) || !podcasts[i]) return;
            podcasts[i].markAsRead();
            updateUI();
        });
    });
}

function updateUI() {
    renderTable();
    renderStats();
    renderAverage();
}

function handleAddPodcast(e) {
    e.preventDefault();

    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const topicInput = document.getElementById("topic");
    const durationInput = document.getElementById("duration");
    const listenedInput = document.getElementById("listened");

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const topic = topicInput.value.trim();
    const duration = Number(durationInput.value);

    if (!title || !author || !topic) return;
    if (!Number.isFinite(duration) || duration <= 0) return;

    podcasts.push(createPodcast(title, author, duration, topic, listenedInput.checked));

    titleInput.value = "";
    authorInput.value = "";
    topicInput.value = "";
    durationInput.value = "";
    listenedInput.checked = false;

    updateUI();
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addPodcastForm");
    if (form) form.addEventListener("submit", handleAddPodcast);
    updateUI();
});
