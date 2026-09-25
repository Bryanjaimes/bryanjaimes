const goals = [
  {
    id: "move",
    label: "Move from the U.S.",
    summary: "Bias toward everyday livability, schools, services, and a softer landing for relocation.",
    weights: { lifestyle: 1.0, investment: 0.55, family: 1.2, convenience: 1.15 }
  },
  {
    id: "invest",
    label: "Buy for income",
    summary: "Bias toward nightly-rate strength, occupancy, and guest appeal without losing resale quality.",
    weights: { lifestyle: 0.9, investment: 1.35, family: 0.6, convenience: 0.95 }
  },
  {
    id: "vacation",
    label: "Second home",
    summary: "Bias toward views, memorable design, and places that feel worth flying in for.",
    weights: { lifestyle: 1.25, investment: 0.8, family: 0.8, convenience: 0.85 }
  }
];

const regions = [
  {
    id: "coast",
    label: "Pacific coast",
    title: "Pacific coast living",
    summary: "Surf energy, ocean views, and the strongest short-stay rental story in the country.",
    signals: ["High demand from foreign visitors", "Best for lifestyle-led investing", "Expect weekend noise in hotspot towns"]
  },
  {
    id: "metro",
    label: "San Salvador metro",
    title: "Metro convenience",
    summary: "Best for schools, healthcare, coworking, and a steady day-to-day operating rhythm.",
    signals: ["Most convenient for relocation", "Easier long-term rental comps", "Lower resort feel, higher service density"]
  },
  {
    id: "highlands",
    label: "Coffee highlands",
    title: "Highland retreat",
    summary: "Cooler weather, garden properties, and a slower hospitality profile around Ruta de las Flores.",
    signals: ["Strong family and retreat appeal", "Less seasonal than pure beach inventory", "Best for character homes rather than towers"]
  },
  {
    id: "lake",
    label: "Lake Coatepeque",
    title: "Lakefront leisure",
    summary: "Rare waterfront inventory with premium views and high emotional pull for buyers.",
    signals: ["Excellent for memorable stays", "Smaller inventory pool", "Pricing holds when architecture is strong"]
  }
];

const budgets = [
  { id: "under250", label: "Under $250k", min: 0, max: 250000 },
  { id: "under400", label: "$250k-$400k", min: 250000, max: 400000 },
  { id: "under650", label: "$400k-$650k", min: 400000, max: 650000 },
  { id: "luxury", label: "$650k+", min: 650000, max: Number.POSITIVE_INFINITY }
];

const needs = [
  { id: "walkable", label: "Walkable", aliases: ["walkable", "cafes", "restaurants"] },
  { id: "remote-ready", label: "Remote work ready", aliases: ["remote", "coworking", "workspace"] },
  { id: "ocean-view", label: "Ocean or water view", aliases: ["ocean", "water", "view", "lake"] },
  { id: "family-ready", label: "Family ready", aliases: ["family", "schools", "yard"] },
  { id: "yield", label: "High rental yield", aliases: ["airbnb", "income", "yield", "rent"] },
  { id: "gated", label: "Secure community", aliases: ["gated", "security", "private"] }
];

const presets = [
  {
    label: "Surf + Airbnb",
    prompt: "I want a surf-town property I can enjoy part-time and rent on Airbnb under $350k."
  },
  {
    label: "Move family",
    prompt: "I am moving from the U.S. and want a family-ready home with schools and walkability."
  },
  {
    label: "Lakefront escape",
    prompt: "Find a design-forward lake house for weekend escapes and future resale."
  },
  {
    label: "Cool-weather retreat",
    prompt: "I want a coffee-country home with garden space, remote work comfort, and boutique-hotel charm."
  }
];

const listings = [
  {
    id: "eltunco-cliff-loft",
    name: "Sunset Cliff Loft",
    location: "El Tunco",
    region: "coast",
    price: 285000,
    beds: 2,
    baths: 2,
    size: 1220,
    type: "Loft",
    blurb: "A furnished cliff-edge loft above the break with a rooftop plunge pool and direct guest appeal.",
    narrative: "Best for a buyer who wants the shortest path from search to a memorable listing with rental upside.",
    tags: ["walkable", "remote-ready", "ocean-view", "yield"],
    scores: { lifestyle: 94, investment: 92, family: 56, convenience: 72 },
    stats: { airportMinutes: 48, beachMinutes: 3, schoolMinutes: 35, nightlyRate: 185, occupancy: 0.66 },
    highlights: ["Walk to restaurants and surf schools", "Solar backup + fiber internet", "Designed for content-rich short stays"],
    concern: "Nightlife spillover on peak weekends.",
    gradient: "linear-gradient(160deg, #0f4c5c 0%, #1d6f68 42%, #f3a748 100%)"
  },
  {
    id: "mizata-bungalow",
    name: "Mizata Investor Bungalow",
    location: "Mizata",
    region: "coast",
    price: 420000,
    beds: 3,
    baths: 3,
    size: 1850,
    type: "Bungalow",
    blurb: "A modern bungalow in a managed coastal enclave with strong nightly-rate positioning and quieter surroundings.",
    narrative: "Best for cleaner hospitality economics without being in the noisiest surf corridor.",
    tags: ["remote-ready", "ocean-view", "yield", "gated"],
    scores: { lifestyle: 91, investment: 95, family: 63, convenience: 67 },
    stats: { airportMinutes: 70, beachMinutes: 2, schoolMinutes: 50, nightlyRate: 260, occupancy: 0.69 },
    highlights: ["Managed guest services", "Resort-grade pool and beach club", "Good layout for 6-8 guests"],
    concern: "Less walkable than El Tunco.",
    gradient: "linear-gradient(160deg, #194857 0%, #2f8f83 38%, #7bc9c1 100%)"
  },
  {
    id: "escalon-courtyard-home",
    name: "Escalon Courtyard House",
    location: "Colonia Escalon",
    region: "metro",
    price: 510000,
    beds: 4,
    baths: 4.5,
    size: 3420,
    type: "House",
    blurb: "A renovated family home with a shaded courtyard, easy school runs, and access to the capital's services.",
    narrative: "Best for relocation buyers who want comfort, services, and a credible long-term base.",
    tags: ["walkable", "remote-ready", "family-ready", "gated"],
    scores: { lifestyle: 82, investment: 74, family: 95, convenience: 96 },
    stats: { airportMinutes: 45, beachMinutes: 60, schoolMinutes: 10, nightlyRate: 210, occupancy: 0.41 },
    highlights: ["Near schools and hospitals", "Private office and backup power", "Landscaped courtyard for children"],
    concern: "Less vacation magic than the coast or lake.",
    gradient: "linear-gradient(160deg, #37583d 0%, #557c57 45%, #d6b88f 100%)"
  },
  {
    id: "santa-tecla-creative-flat",
    name: "Santa Tecla Creative Flat",
    location: "Santa Tecla",
    region: "metro",
    price: 238000,
    beds: 2,
    baths: 2,
    size: 1080,
    type: "Flat",
    blurb: "A bright apartment close to cafes, gyms, and coworking, designed for younger remote-first buyers.",
    narrative: "Best for lower-friction relocation and a first foothold in the market.",
    tags: ["walkable", "remote-ready"],
    scores: { lifestyle: 78, investment: 68, family: 72, convenience: 92 },
    stats: { airportMinutes: 50, beachMinutes: 65, schoolMinutes: 14, nightlyRate: 125, occupancy: 0.49 },
    highlights: ["Strong daily convenience", "Lock-and-leave format", "Walkable food and service cluster"],
    concern: "Limited upside for large-family use.",
    gradient: "linear-gradient(160deg, #5f4b32 0%, #b67c4c 40%, #f3d3a0 100%)"
  },
  {
    id: "coatepeque-glass-villa",
    name: "Coatepeque Glass Villa",
    location: "Lake Coatepeque",
    region: "lake",
    price: 690000,
    beds: 4,
    baths: 4,
    size: 3100,
    type: "Villa",
    blurb: "A tiered lakefront villa with sunset decks, private dock access, and architecture built around the view.",
    narrative: "Best for emotional punch, group stays, and a signature listing profile.",
    tags: ["remote-ready", "ocean-view", "yield", "family-ready", "gated"],
    scores: { lifestyle: 97, investment: 86, family: 84, convenience: 64 },
    stats: { airportMinutes: 95, beachMinutes: 90, schoolMinutes: 42, nightlyRate: 420, occupancy: 0.58 },
    highlights: ["Direct lake access", "Statement architecture", "High ADR potential for group trips"],
    concern: "Smaller buyer pool at this price point.",
    gradient: "linear-gradient(160deg, #1b4459 0%, #37718e 38%, #a2d6f9 100%)"
  },
  {
    id: "juayua-terrace-house",
    name: "Juayua Terrace House",
    location: "Juayua",
    region: "highlands",
    price: 315000,
    beds: 3,
    baths: 2.5,
    size: 1960,
    type: "House",
    blurb: "A hillside home with fruit trees, guest casita potential, and cooler air for year-round use.",
    narrative: "Best for a slower family or retreat lifestyle with room to host.",
    tags: ["remote-ready", "family-ready", "gated"],
    scores: { lifestyle: 88, investment: 75, family: 89, convenience: 70 },
    stats: { airportMinutes: 110, beachMinutes: 100, schoolMinutes: 18, nightlyRate: 165, occupancy: 0.52 },
    highlights: ["Mild climate and garden space", "Potential for hosted retreat weekends", "Good value per square foot"],
    concern: "Longer transfer time from the airport.",
    gradient: "linear-gradient(160deg, #274029 0%, #4f6f52 45%, #d7c6a3 100%)"
  },
  {
    id: "ataco-garden-casita",
    name: "Ataco Garden Casita",
    location: "Concepcion de Ataco",
    region: "highlands",
    price: 215000,
    beds: 2,
    baths: 2,
    size: 1340,
    type: "Casita",
    blurb: "A design-led casita near cafes and murals, built for slower travel and boutique-rental demand.",
    narrative: "Best for lower-ticket hospitality plays with character and charm.",
    tags: ["walkable", "remote-ready", "yield"],
    scores: { lifestyle: 90, investment: 79, family: 68, convenience: 73 },
    stats: { airportMinutes: 118, beachMinutes: 105, schoolMinutes: 16, nightlyRate: 135, occupancy: 0.57 },
    highlights: ["Walk to the town core", "Distinctive boutique feel", "Lower capital required"],
    concern: "Smaller resale pool than metro product.",
    gradient: "linear-gradient(160deg, #5b3328 0%, #99582a 38%, #ffcb77 100%)"
  },
  {
    id: "costa-del-sol-compound",
    name: "Costa del Sol Family Compound",
    location: "Costa del Sol",
    region: "coast",
    price: 590000,
    beds: 5,
    baths: 5,
    size: 3880,
    type: "Compound",
    blurb: "A large coastal compound with multiple social zones, made for extended family trips or premium group rentals.",
    narrative: "Best for families or investors who want scale and broad guest capacity.",
    tags: ["ocean-view", "family-ready", "yield", "gated"],
    scores: { lifestyle: 89, investment: 88, family: 93, convenience: 78 },
    stats: { airportMinutes: 38, beachMinutes: 1, schoolMinutes: 30, nightlyRate: 390, occupancy: 0.61 },
    highlights: ["Fastest airport access among beach options", "Sleeps large groups comfortably", "Private pool and event-ready deck"],
    concern: "Higher maintenance footprint.",
    gradient: "linear-gradient(160deg, #173753 0%, #4a6fa5 42%, #f7b267 100%)"
  }
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const state = {
  goal: null,
  region: null,
  budget: null,
  needs: [],
  prompt: "",
  selectedListingId: null,
  generationTimer: null,
  generationToken: 0,
  visibleModuleCount: 0,
  generating: false
};

const elements = {
  promptForm: document.querySelector("#promptForm"),
  promptInput: document.querySelector("#promptInput"),
  presetRow: document.querySelector("#presetRow"),
  goalControls: document.querySelector("#goalControls"),
  regionControls: document.querySelector("#regionControls"),
  budgetControls: document.querySelector("#budgetControls"),
  needControls: document.querySelector("#needControls"),
  liveSummary: document.querySelector("#liveSummary"),
  agentRail: document.querySelector("#agentRail"),
  generatedCanvas: document.querySelector("#generatedCanvas"),
  clearNeeds: document.querySelector("#clearNeeds"),
  resetButtons: [...document.querySelectorAll("[data-reset-field]")]
};

initialize();

function initialize() {
  renderPresetChips();
  renderControlChips();
  bindEvents();
  generateCanvas("Initial state");
}

function bindEvents() {
  elements.promptForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.prompt = elements.promptInput.value.trim();
    applyPromptInferences(state.prompt);
    generateCanvas("Prompt submitted");
  });

  elements.clearNeeds.addEventListener("click", () => {
    state.needs = [];
    generateCanvas("Cleared must-haves");
  });

  elements.resetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const field = button.dataset.resetField;
      state[field] = null;
      generateCanvas(`Cleared ${field}`);
    });
  });
}

function renderPresetChips() {
  elements.presetRow.innerHTML = presets
    .map(
      (preset) => `
        <button class="preset-chip" type="button" data-preset="${escapeAttribute(preset.prompt)}">
          ${preset.label}
        </button>
      `
    )
    .join("");

  [...elements.presetRow.querySelectorAll("[data-preset]")].forEach((button) => {
    button.addEventListener("click", () => {
      const prompt = button.dataset.preset;
      elements.promptInput.value = prompt;
      state.prompt = prompt;
      applyPromptInferences(prompt);
      generateCanvas("Preset selected");
    });
  });
}

function renderControlChips() {
  renderChipGroup(elements.goalControls, goals, state.goal, "goal", false);
  renderChipGroup(elements.regionControls, regions, state.region, "region", false);
  renderChipGroup(elements.budgetControls, budgets, state.budget, "budget", false);
  renderChipGroup(elements.needControls, needs, state.needs, "need", true);
}

function renderChipGroup(container, items, activeValue, field, multiselect) {
  container.innerHTML = items
    .map((item) => {
      const isActive = multiselect ? activeValue.includes(item.id) : activeValue === item.id;
      return `
        <button
          type="button"
          class="chip ${isActive ? "chip-active" : ""}"
          data-field="${field}"
          data-id="${item.id}"
        >
          ${item.label}
        </button>
      `;
    })
    .join("");

  [...container.querySelectorAll("[data-id]")].forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      if (field === "need") {
        state.needs = state.needs.includes(id)
          ? state.needs.filter((item) => item !== id)
          : [...state.needs, id];
      } else {
        state[field] = state[field] === id ? null : id;
      }

      generateCanvas(`${field} updated`);
    });
  });
}

function applyPromptInferences(prompt) {
  if (!prompt) {
    return;
  }

  const text = prompt.toLowerCase();

  if (text.includes("move") || text.includes("relocat") || text.includes("family")) {
    state.goal = "move";
  } else if (text.includes("rent") || text.includes("airbnb") || text.includes("yield") || text.includes("income")) {
    state.goal = "invest";
  } else if (text.includes("vacation") || text.includes("weekend") || text.includes("escape")) {
    state.goal = "vacation";
  }

  if (text.includes("surf") || text.includes("beach") || text.includes("coast") || text.includes("ocean")) {
    state.region = "coast";
  } else if (text.includes("city") || text.includes("metro") || text.includes("school")) {
    state.region = "metro";
  } else if (text.includes("coffee") || text.includes("mountain") || text.includes("garden") || text.includes("cool")) {
    state.region = "highlands";
  } else if (text.includes("lake")) {
    state.region = "lake";
  }

  const budgetMatch = text.match(/\$?(\d{3,4})k/);
  const numericMatch = text.match(/\$?(\d{3,6})(?:,(\d{3}))?/);
  let parsedBudget = null;

  if (budgetMatch) {
    parsedBudget = Number(budgetMatch[1]) * 1000;
  } else if (numericMatch) {
    parsedBudget = Number(`${numericMatch[1]}${numericMatch[2] || ""}`);
  }

  if (parsedBudget !== null) {
    const match = budgets.find((budget) => parsedBudget >= budget.min && parsedBudget <= budget.max);
    if (match) {
      state.budget = match.id;
    }
  }

  needs.forEach((need) => {
    if (need.aliases.some((alias) => text.includes(alias)) && !state.needs.includes(need.id)) {
      state.needs.push(need.id);
    }
  });
}
function generateCanvas(trigger) {
  clearTimer();
  renderControlChips();
  const modules = buildModules();
  const agentNotes = buildAgentNotes(modules.length, trigger);
  const summary = buildSummary(modules);

  if (!state.selectedListingId) {
    state.selectedListingId = summary.topListing?.id ?? modules.find((module) => module.primaryListingId)?.primaryListingId ?? listings[0].id;
  }

  state.visibleModuleCount = 0;
  state.generating = true;
  state.generationToken += 1;
  const activeToken = state.generationToken;

  renderSummary(summary);
  renderAgentRail(agentNotes);
  renderCanvas(modules);

  state.generationTimer = window.setInterval(() => {
    if (activeToken !== state.generationToken) {
      return clearTimer();
    }

    state.visibleModuleCount += 1;
    if (state.visibleModuleCount >= modules.length) {
      state.generating = false;
      clearTimer();
    }

    renderSummary(summary);
    renderAgentRail(agentNotes);
    renderCanvas(modules);
  }, 180);
}

function clearTimer() {
  if (state.generationTimer) {
    window.clearInterval(state.generationTimer);
    state.generationTimer = null;
  }
}

function buildSummary(modules) {
  const ranked = rankListings();
  const topListing = ranked[0];
  const goal = goals.find((item) => item.id === state.goal);
  const region = regions.find((item) => item.id === state.region);
  const budget = budgets.find((item) => item.id === state.budget);

  const activeFilters = [
    goal?.label,
    region?.label,
    budget?.label,
    ...state.needs.map((id) => needs.find((item) => item.id === id)?.label)
  ].filter(Boolean);

  const copy = topListing
    ? `${topListing.name} is leading because it best matches your current intent${activeFilters.length ? `: ${activeFilters.join(", ")}` : ""}.`
    : "Choose a goal or prompt to start generating a focused property workspace.";

  return {
    topListing,
    copy,
    activeFilters,
    moduleCount: modules.length,
    ranked
  };
}

function buildAgentNotes(moduleCount, trigger) {
  const ranked = rankListings().slice(0, 3);
  const top = ranked[0];
  const budget = budgets.find((item) => item.id === state.budget);
  const goal = goals.find((item) => item.id === state.goal);
  const region = regions.find((item) => item.id === state.region);

  return [
    {
      title: "Intent model",
      body: state.prompt
        ? `Read your brief and mapped it to ${goal?.label ?? "an open search"} with ${region?.label ?? "all regions"} in play.`
        : "Waiting for a prompt or step selection. The canvas is showing broad discovery mode.",
      active: true
    },
    {
      title: "Ranking logic",
      body: top
        ? `${top.name} currently leads. Scores balance lifestyle, convenience, family fit, and investment signals against price friction.`
        : "No shortlist yet. Add a region or budget to shift into ranking mode.",
      active: state.visibleModuleCount >= 1
    },
    {
      title: "Market frame",
      body: budget
        ? `Budget band is ${budget.label}. The model tolerates slight overages only when the property meaningfully outperforms in your chosen goal.`
        : "Budget is still open, so the shortlist favors high-fit properties across several price bands.",
      active: state.visibleModuleCount >= 2
    },
    {
      title: "Generated workspace",
      body: `This run is composing ${moduleCount} panels from the current search state. Trigger: ${trigger}.`,
      active: state.generating || state.visibleModuleCount >= 3
    }
  ];
}

function buildModules() {
  const ranked = rankListings();
  const topListing = ranked[0];
  const selected = getSelectedListing(ranked);
  const region = regions.find((item) => item.id === state.region);
  const goal = goals.find((item) => item.id === state.goal);

  const modules = [];

  modules.push({
    type: "lead",
    accent: "AI brief",
    title: buildLeadTitle(),
    copy: buildLeadCopy(topListing, ranked),
    ranked,
    primaryListingId: topListing?.id
  });

  if (!state.goal && !state.region && !state.budget && state.needs.length === 0 && !state.prompt) {
    modules.push({
      type: "regions",
      accent: "Discovery",
      title: "Four ways to enter the market",
      copy: "Start broad. The interface introduces regions first so the next modules can be generated around a real context instead of a generic filter form."
    });
  } else {
    if (goal) {
      modules.push({
        type: "goal",
        accent: "Search path",
        title: `Configured for ${goal.label.toLowerCase()}`,
        copy: goal.summary
      });
    }

    if (region) {
      modules.push({
        type: "region-intel",
        accent: "Region read",
        title: region.title,
        copy: region.summary,
        region
      });
    }

    modules.push({
      type: "shortlist",
      accent: "Shortlist",
      title: "Recommended properties",
      copy: "The shortlist is recalculated every time you change intent. Cards below are sample inventory with scores driven by your current brief.",
      ranked: ranked.slice(0, 4)
    });

    if (ranked.length >= 3) {
      modules.push({
        type: "compare",
        accent: "Head-to-head",
        title: "Why these three float to the top",
        copy: "Generative UI should not stop at cards. It should explain tradeoffs and generate the decision surface you need next.",
        ranked: ranked.slice(0, 3)
      });
    }

    if (selected) {
      modules.push({
        type: "detail",
        accent: "Dossier",
        title: `${selected.name} as a next move`,
        copy: selected.narrative,
        selected
      });
    }

    modules.push({
      type: "plan",
      accent: "Next actions",
      title: "What the product should generate next",
      copy: "After the shortlist, the UI should stop being generic and switch to decision support.",
      goal,
      topListing,
      selected
    });
  }

  return modules;
}

function buildLeadTitle() {
  const goal = goals.find((item) => item.id === state.goal);
  const region = regions.find((item) => item.id === state.region);

  if (goal && region) {
    return `${goal.label} in ${region.label}`;
  }

  if (goal) {
    return `${goal.label} across El Salvador`;
  }

  if (region) {
    return `Search the ${region.label}`;
  }

  return "A property search that assembles itself";
}

function buildLeadCopy(topListing, ranked) {
  if (!topListing) {
    return "No sample listings match the current filter stack. Relax the budget or remove a must-have.";
  }

  const goal = goals.find((item) => item.id === state.goal);
  const region = regions.find((item) => item.id === state.region);
  const budget = budgets.find((item) => item.id === state.budget);

  const fragments = [];

  if (goal) {
    fragments.push(`The model is prioritizing ${goal.label.toLowerCase()}.`);
  }

  if (region) {
    fragments.push(`Regional bias is set to ${region.label}.`);
  }

  if (budget) {
    fragments.push(`Budget focus is ${budget.label}.`);
  }

  if (state.needs.length > 0) {
    const labels = state.needs.map((id) => needs.find((item) => item.id === id)?.label).filter(Boolean);
    fragments.push(`Must-haves include ${labels.join(", ")}.`);
  }

  fragments.push(`${topListing.name} leads, followed by ${ranked.slice(1, 3).map((item) => item.name).join(" and ")}.`);

  return fragments.join(" ");
}

function rankListings() {
  const goal = goals.find((item) => item.id === state.goal);
  const budget = budgets.find((item) => item.id === state.budget);

  return listings
    .map((listing) => {
      const weight = goal?.weights ?? { lifestyle: 1, investment: 1, family: 1, convenience: 1 };
      let score =
        listing.scores.lifestyle * weight.lifestyle +
        listing.scores.investment * weight.investment +
        listing.scores.family * weight.family +
        listing.scores.convenience * weight.convenience;

      if (state.region && listing.region === state.region) {
        score += 88;
      } else if (state.region) {
        score -= 34;
      }

      if (budget) {
        if (listing.price >= budget.min && listing.price <= budget.max) {
          score += 64;
        } else if (listing.price <= budget.max * 1.08) {
          score += 14;
        } else {
          score -= 46;
        }
      }

      state.needs.forEach((needId) => {
        if (listing.tags.includes(needId)) {
          score += 22;
        } else {
          score -= 8;
        }
      });

      if (state.prompt) {
        const lowerPrompt = state.prompt.toLowerCase();
        listing.highlights.forEach((highlight) => {
          if (lowerPrompt.includes(highlight.split(" ")[0].toLowerCase())) {
            score += 4;
          }
        });

        if (lowerPrompt.includes(listing.location.toLowerCase()) || lowerPrompt.includes(listing.type.toLowerCase())) {
          score += 18;
        }
      }

      return { ...listing, matchScore: Math.round(score / 4) };
    })
    .sort((left, right) => right.matchScore - left.matchScore);
}

function getSelectedListing(ranked) {
  const candidate = ranked.slice(0, 4).find((listing) => listing.id === state.selectedListingId);
  return candidate ?? ranked[0] ?? null;
}
function renderSummary(summary) {
  const top = summary.topListing;
  const activeFilters = summary.activeFilters.length
    ? `<p class="tiny-label">Active filters</p><p class="summary-copy">${summary.activeFilters.join(" / ")}</p>`
    : `<p class="tiny-label">Active filters</p><p class="summary-copy">None yet. Try a preset to see the canvas recompose itself.</p>`;

  elements.liveSummary.innerHTML = `
    <div>
      <p class="section-label">Live brief</p>
      <h2>${top ? top.name : "Waiting for direction"}</h2>
      <p class="summary-copy">${summary.copy}</p>
      <div class="summary-grid">
        <div class="summary-metric">
          <div class="metric-label">Top ask</div>
          <div class="metric-value">${top ? currency.format(top.price) : "--"}</div>
        </div>
        <div class="summary-metric">
          <div class="metric-label">Generated panels</div>
          <div class="metric-value">${Math.min(state.visibleModuleCount + 1, summary.moduleCount)} / ${summary.moduleCount}</div>
        </div>
        <div class="summary-metric">
          <div class="metric-label">Best region</div>
          <div class="metric-value">${top ? regionLabel(top.region) : "--"}</div>
        </div>
        <div class="summary-metric">
          <div class="metric-label">Match score</div>
          <div class="metric-value">${top ? top.matchScore : "--"}</div>
        </div>
      </div>
    </div>
    <div class="summary-banner">
      <strong>${top ? `${top.location} / ${top.type}` : "Generative UI mode"}</strong>
      <p class="summary-copy">${top ? top.blurb : "The UI is designed to grow from discovery into a full decision workspace as you answer questions."}</p>
    </div>
    <div>${activeFilters}</div>
  `;
}

function renderAgentRail(notes) {
  elements.agentRail.innerHTML = `
    <div class="rail-header">
      <p class="section-label">Agent view</p>
      <h2>What the system is doing</h2>
    </div>
    ${notes
      .map(
        (note) => `
          <article class="rail-card ${note.active ? "rail-card-active" : ""} ${note.active && state.generating ? "loading-sheen" : ""}">
            <strong>${note.title}</strong>
            <p>${note.body}</p>
          </article>
        `
      )
      .join("")}
  `;
}

function renderCanvas(modules) {
  const visibleCount = Math.min(modules.length, state.visibleModuleCount + 1);
  const visible = modules.slice(0, visibleCount);
  elements.generatedCanvas.innerHTML = visible.map((module, index) => renderModule(module, index)).join("");

  [...elements.generatedCanvas.querySelectorAll("[data-select-listing]")].forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedListingId = button.dataset.selectListing;
      generateCanvas("Listing selected");
    });
  });
}

function renderModule(module, index) {
  switch (module.type) {
    case "lead":
      return `
        <article class="module" style="animation-delay:${index * 70}ms">
          ${renderModuleHeader(module)}
          <div class="stats-grid">
            ${module.ranked.slice(0, 4).map((listing) => renderStatCard(listing)).join("")}
          </div>
        </article>
      `;
    case "regions":
      return `
        <article class="module" style="animation-delay:${index * 70}ms">
          ${renderModuleHeader(module)}
          <div class="featured-grid">
            ${regions
              .map(
                (region) => `
                  <article class="feature-tile" style="background:${regionGradient(region.id)}">
                    <p class="tiny-label">${region.label}</p>
                    <h3>${region.title}</h3>
                    <p>${region.summary}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </article>
      `;
    case "goal":
      return `
        <article class="module" style="animation-delay:${index * 70}ms">
          ${renderModuleHeader(module)}
          <div class="plan-grid">
            <article class="plan-card">
              <strong>Generated for</strong>
              <p>${module.copy}</p>
            </article>
            <article class="plan-card">
              <strong>UI reaction</strong>
              <p>The next panels now emphasize the metrics and tradeoffs that actually matter for this goal.</p>
            </article>
            <article class="plan-card">
              <strong>What changed</strong>
              <p>Ranking, region framing, and next-step recommendations have been reweighted in this run.</p>
            </article>
          </div>
        </article>
      `;
    case "region-intel":
      return `
        <article class="module" style="animation-delay:${index * 70}ms">
          ${renderModuleHeader(module)}
          <div class="plan-grid">
            ${module.region.signals
              .map(
                (signal) => `
                  <article class="plan-card">
                    <strong>Signal</strong>
                    <p>${signal}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </article>
      `;
    case "shortlist":
      return `
        <article class="module" style="animation-delay:${index * 70}ms">
          ${renderModuleHeader(module)}
          <div class="listing-grid">
            ${module.ranked.map((listing) => renderListingCard(listing)).join("")}
          </div>
        </article>
      `;
    case "compare":
      return `
        <article class="module" style="animation-delay:${index * 70}ms">
          ${renderModuleHeader(module)}
          <div class="compare-grid">
            ${module.ranked.map((listing) => renderCompareCard(listing)).join("")}
          </div>
        </article>
      `;
    case "detail":
      return `
        <article class="module" style="animation-delay:${index * 70}ms">
          ${renderModuleHeader(module)}
          ${renderDetailModule(module.selected)}
        </article>
      `;
    case "plan":
      return `
        <article class="module" style="animation-delay:${index * 70}ms">
          ${renderModuleHeader(module)}
          <div class="plan-grid">
            ${buildPlanCards(module).map(renderPlanCard).join("")}
          </div>
        </article>
      `;
    default:
      return `
        <article class="module empty-state" style="animation-delay:${index * 70}ms">
          <p>Unknown module.</p>
        </article>
      `;
  }
}

function renderModuleHeader(module) {
  return `
    <div class="module-header">
      <div>
        <p class="section-label">${module.accent}</p>
        <h2 class="module-title">${module.title}</h2>
        <p class="module-copy">${module.copy}</p>
      </div>
      <span class="module-accent">${module.accent}</span>
    </div>
  `;
}

function renderStatCard(listing) {
  return `
    <article class="stat-card">
      <p class="tiny-label">${listing.location}</p>
      <strong>${listing.name}</strong>
      <p>${listing.blurb}</p>
      <div class="compare-score">${listing.matchScore}</div>
    </article>
  `;
}

function renderListingCard(listing) {
  return `
    <article class="listing-card">
      <div class="listing-image" style="background:${listing.gradient}">
        <div>
          <p class="tiny-label">${regionLabel(listing.region)}</p>
          <h3>${listing.name}</h3>
        </div>
        <span class="listing-badge">${listing.matchScore} match</span>
      </div>
      <div class="listing-body">
        <p class="listing-copy">${listing.blurb}</p>
        <div class="listing-meta">
          <span class="meta-pill">${listing.beds} bd / ${listing.baths} ba</span>
          <span class="meta-pill">${listing.size.toLocaleString()} sf</span>
          <span class="meta-pill">${listing.location}</span>
        </div>
        <div class="listing-footer">
          <div class="price-tag">${currency.format(listing.price)}</div>
          <button
            type="button"
            class="listing-button ${state.selectedListingId === listing.id ? "listing-button-active" : ""}"
            data-select-listing="${listing.id}"
          >
            ${state.selectedListingId === listing.id ? "Selected" : "Open dossier"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderCompareCard(listing) {
  return `
    <article class="compare-card">
      <p class="tiny-label">${listing.location}</p>
      <h3>${listing.name}</h3>
      <div class="compare-score">${listing.matchScore}</div>
      <p><strong>Investment:</strong> ${listing.scores.investment} / 100</p>
      <p><strong>Family:</strong> ${listing.scores.family} / 100</p>
      <p><strong>Convenience:</strong> ${listing.scores.convenience} / 100</p>
      <p><strong>Lifestyle:</strong> ${listing.scores.lifestyle} / 100</p>
    </article>
  `;
}
function renderDetailModule(listing) {
  if (!listing) {
    return `<div class="empty-state">No listing selected.</div>`;
  }

  const yieldEstimate = Math.round(listing.stats.nightlyRate * listing.stats.occupancy * 365);

  return `
    <div class="detail-shell">
      <article class="detail-card">
        <div class="detail-image" style="background:${listing.gradient}">
          <div class="detail-header">
            <p class="tiny-label">${listing.location} / ${listing.type}</p>
            <h3>${listing.name}</h3>
          </div>
          <span class="listing-badge">${currency.format(listing.price)}</span>
        </div>
        <div class="detail-body">
          <p class="detail-copy">${listing.narrative}</p>
          <div class="detail-meta">
            <span class="meta-pill">${listing.stats.airportMinutes} min to airport</span>
            <span class="meta-pill">${listing.stats.beachMinutes} min to water</span>
            <span class="meta-pill">${listing.stats.schoolMinutes} min to schools</span>
          </div>
          <ul class="detail-list">
            ${listing.highlights.map((item) => `<li>${item}</li>`).join("")}
            <li>Watch-out: ${listing.concern}</li>
          </ul>
          <div class="detail-footer">
            <div class="price-tag">${listing.matchScore} score</div>
            <button type="button" class="listing-button listing-button-active">Sample data only</button>
          </div>
        </div>
      </article>
      <aside class="detail-side">
        <strong>Generated signals</strong>
        <ul class="signal-list">
          <li>Estimated gross annual short-stay revenue: ${currency.format(yieldEstimate)}</li>
          <li>Primary audience: ${primaryAudience(listing)}</li>
          <li>Best use case: ${bestUseCase(listing)}</li>
          <li>Design note: the UI should now branch into financing, tour planning, or underwriting based on the selected goal.</li>
        </ul>
      </aside>
    </div>
  `;
}

function buildPlanCards(module) {
  const goalId = module.goal?.id;
  const selected = module.selected ?? module.topListing;
  const destination = selected ? `${selected.name} in ${selected.location}` : "the current top listing";

  const cards = [
    {
      title: "Trip builder",
      body: `Generate a visit plan around ${destination}: airport arrival, neighborhood stops, school visits, and backup listings nearby.`
    }
  ];

  if (goalId === "invest") {
    cards.push(
      {
        title: "Yield view",
        body: "Swap the comparison UI into a lightweight underwriting view with occupancy scenarios, cleaning costs, and seasonality assumptions."
      },
      {
        title: "Acquisition path",
        body: "Generate a checklist for local counsel, title review, furnished setup, and first 90 days of property operations."
      }
    );
  } else if (goalId === "move") {
    cards.push(
      {
        title: "Relocation layer",
        body: "Generate schools, healthcare, commute, and daily-service data directly beside the property detail, not in a separate workflow."
      },
      {
        title: "Move timeline",
        body: "Add a 30-60-90 day relocation plan covering lease overlap, utilities, residency paperwork, and furnishing priorities."
      }
    );
  } else {
    cards.push(
      {
        title: "Experience fit",
        body: "Generate hosting scenarios: quiet weekends, group stays, chef setup, and local day-trip options that make the property feel special."
      },
      {
        title: "Resale lens",
        body: "Show what protects value later: view permanence, uniqueness, layout flexibility, and replacement scarcity."
      }
    );
  }

  return cards;
}

function renderPlanCard(card) {
  return `
    <article class="plan-card">
      <strong>${card.title}</strong>
      <p>${card.body}</p>
    </article>
  `;
}

function regionLabel(id) {
  return regions.find((region) => region.id === id)?.label ?? id;
}

function regionGradient(id) {
  const gradients = {
    coast: "linear-gradient(160deg, #0f4c5c 0%, #2f8f83 42%, #f3a748 100%)",
    metro: "linear-gradient(160deg, #315f4a 0%, #587457 44%, #c9b79c 100%)",
    highlands: "linear-gradient(160deg, #3d4f2f 0%, #6d8a46 46%, #d9c39c 100%)",
    lake: "linear-gradient(160deg, #173753 0%, #4a6fa5 42%, #b8e1ff 100%)"
  };

  return gradients[id] ?? gradients.metro;
}

function primaryAudience(listing) {
  if (listing.scores.investment >= 90) {
    return "short-stay guests and hybrid investor-owners";
  }

  if (listing.scores.family >= 90) {
    return "relocating families";
  }

  if (listing.region === "highlands") {
    return "retreat buyers and slow-travel guests";
  }

  return "lifestyle-led buyers";
}

function bestUseCase(listing) {
  if (listing.tags.includes("yield")) {
    return "mixed personal use with premium short-stay rental windows";
  }

  if (listing.tags.includes("family-ready")) {
    return "full-time living with periodic hosting";
  }

  return "lower-friction second-home ownership";
}

function escapeAttribute(value) {
  return value.replace(/"/g, "&quot;");
}
