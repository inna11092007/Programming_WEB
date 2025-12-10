const STORAGE_KEY = "pr5_todos";

const input = document.getElementById("new-task-input");
const list = document.getElementById("tasks-list");
const filterButtons = document.querySelectorAll(".filter-btn");

let todos = loadTodos();
let currentFilter = "all";

function loadTodos() {
    const saved = localStorage.getItem(STORAGE_KEY);
    try {
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function formatDate(timestamp) {
    const d = new Date(timestamp);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(-2);
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${dd}.${mm}.${yy}, ${hh}:${min}`;
}

function createTodo(text) {
    const now = Date.now();
    return {
        id: now,
        text: text.trim(),
        createdAt: now,
        done: false
    };
}

function getFilteredTodos() {
    if (currentFilter === "active") {
        return todos.filter(t => !t.done);
    }
    if (currentFilter === "completed") {
        return todos.filter(t => t.done);
    }
    return todos;
}

function renderTodos() {
    list.innerHTML = "";

    const filtered = getFilteredTodos();

    filtered.forEach(todo => {
        const li = document.createElement("li");
        li.className = "task-item";
        if (todo.done) li.classList.add("task-done");
        li.dataset.id = todo.id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = todo.done;

        const content = document.createElement("div");
        content.className = "task-content";

        const textEl = document.createElement("div");
        textEl.className = "task-text";
        textEl.textContent = todo.text;

        const dateEl = document.createElement("div");
        dateEl.className = "task-date";
        dateEl.textContent = formatDate(todo.createdAt);

        content.appendChild(textEl);
        content.appendChild(dateEl);

        const delBtn = document.createElement("button");
        delBtn.className = "task-delete";
        delBtn.type = "button";
        delBtn.textContent = "✕";

        li.appendChild(checkbox);
        li.appendChild(content);
        li.appendChild(delBtn);
        list.appendChild(li);

        checkbox.addEventListener("change", () => {
            todo.done = checkbox.checked;
            saveTodos();
            renderTodos();
        });

        delBtn.addEventListener("click", () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos();
            renderTodos();
        });

        textEl.addEventListener("dblclick", () => {
            startEditTodo(todo, textEl);
        });
    });
}

function startEditTodo(todo, textEl) {
    const parent = textEl.parentElement;
    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.className = "task-edit-input";
    inputEdit.value = todo.text;

    parent.replaceChild(inputEdit, textEl);
    inputEdit.focus();
    inputEdit.select();

    function finishEdit(save) {
        if (save) {
            const newText = inputEdit.value.trim();
            if (newText) {
                todo.text = newText;
            }
        }
        saveTodos();
        renderTodos();
    }

    inputEdit.addEventListener("keydown", (e) => {
        if (e.key === "Enter") finishEdit(true);
        if (e.key === "Escape") finishEdit(false);
    });

    inputEdit.addEventListener("blur", () => finishEdit(true));
}

input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const text = input.value.trim();
    if (!text) return;

    todos.unshift(createTodo(text));
    saveTodos();
    input.value = "";
    renderTodos();
});

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

renderTodos();
