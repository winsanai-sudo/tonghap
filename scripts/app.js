const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
const grid = document.querySelector("#project-grid");
const template = document.querySelector("#project-card-template");
const searchInput = document.querySelector("#search-input");
const filters = document.querySelector("#category-filters");
const projectCount = document.querySelector("#project-count");

let activeCategory = "전체";

projectCount.textContent = String(projects.length);

function toFileUrl(path) {
  if (!path) return "";
  const normalized = path.replaceAll("\\", "/");
  return `file:///${encodeURI(normalized)}`;
}

function getProjectHref(project) {
  return project.url || toFileUrl(project.localPath);
}

function makeFilterButton(category) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "filter-button";
  button.textContent = category;
  button.setAttribute("aria-pressed", String(category === activeCategory));
  button.addEventListener("click", () => {
    activeCategory = category;
    renderFilters();
    renderProjects();
  });
  return button;
}

function renderFilters() {
  const categories = ["전체", ...new Set(projects.map((project) => project.category))];
  filters.replaceChildren(...categories.map(makeFilterButton));
}

function matchesProject(project, query) {
  const haystack = `${project.name} ${project.category} ${project.description}`.toLowerCase();
  const categoryMatches = activeCategory === "전체" || project.category === activeCategory;
  return categoryMatches && haystack.includes(query);
}

function renderProjects() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleProjects = projects.filter((project) => matchesProject(project, query));

  if (!visibleProjects.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "검색 결과가 없습니다.";
    grid.replaceChildren(empty);
    return;
  }

  const cards = visibleProjects.map((project, index) => {
    const card = template.content.firstElementChild.cloneNode(true);
    const href = getProjectHref(project);
    card.querySelector(".project-card__index").textContent = String(index + 1).padStart(2, "0");
    card.querySelector(".project-card__category").textContent = project.category;
    card.querySelector("h2").textContent = project.name;
    card.querySelector("p").textContent = project.description;

    const link = card.querySelector("a");
    if (href) {
      link.href = href;
      link.textContent = "열기";
    } else {
      link.classList.add("is-empty");
      link.removeAttribute("href");
      link.textContent = "주소 필요";
    }

    return card;
  });

  grid.replaceChildren(...cards);
}

searchInput.addEventListener("input", renderProjects);
renderFilters();
renderProjects();
