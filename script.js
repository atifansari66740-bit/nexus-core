
// ========================================
// NEXUS CORE — NAVIGATION ELEMENTS
// ========================================

const navButtons = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page-view");

const breadcrumb = document.getElementById("breadcrumb");
const sidebar = document.getElementById("sidebar");

const menuToggle = document.getElementById("menuToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");


// ========================================
// PAGE NAVIGATION
// ========================================

function navigateTo(pageName, button) {

  const targetPage = document.getElementById("page-" + pageName);

  // Prevent navigation to a page that does not exist.
  if (!targetPage || !button) return;

  pages.forEach(function(page) {
    page.classList.toggle("active", page === targetPage);
  });

  navButtons.forEach(function(navButton) {

    const isActive = navButton === button;

    navButton.classList.toggle("active", isActive);

    if (isActive) {
      navButton.setAttribute("aria-current", "page");
    } else {
      navButton.removeAttribute("aria-current");
    }

  });

  const buttonClone = button.cloneNode(true);

const navIcon = buttonClone.querySelector(".nav-icon");

if (navIcon) {
  navIcon.remove();
}

breadcrumb.textContent = buttonClone.textContent.trim();

  closeSidebar();

window.scrollTo({
  top: 0,
  behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth"
});

}


// ========================================
// NAVIGATION CLICK EVENTS
// ========================================

navButtons.forEach(function(button) {

  button.addEventListener("click", function() {

    navigateTo(button.dataset.page, button);

  });

});


// ========================================
// SIDEBAR FUNCTIONS
// ========================================

function closeSidebar() {

  sidebar.classList.remove("open");

  sidebarOverlay.classList.remove("visible");

  document.body.classList.remove("sidebar-open");

  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.setAttribute("aria-label", "Open navigation");

  sidebarOverlay.setAttribute("aria-hidden", "true");

  if (window.matchMedia("(max-width: 700px)").matches) {
  menuToggle.focus();
}

}


function toggleSidebar() {

  const isOpen = sidebar.classList.toggle("open");

  sidebarOverlay.classList.toggle("visible", isOpen);

  document.body.classList.toggle("sidebar-open", isOpen);

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  sidebarOverlay.setAttribute(
    "aria-hidden",
    String(!isOpen)
  );

  if (isOpen) {
  const activeButton = sidebar.querySelector(
    '[data-page][aria-current="page"]'
  );

  if (activeButton) {
    activeButton.focus();

    requestAnimationFrame(function() {
      const sidebarRect = sidebar.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      const buttonTop =
        sidebar.scrollTop + buttonRect.top - sidebarRect.top;

      const buttonHeight = activeButton.offsetHeight;

      const targetScroll =
        buttonTop -
        (sidebar.clientHeight / 2) +
        (buttonHeight / 2);

      const maxScroll = Math.max(
        0,
        sidebar.scrollHeight - sidebar.clientHeight
      );

      sidebar.scrollTop = Math.max(
        0,
        Math.min(targetScroll, maxScroll)
      );
    });
  }
}

}


// ========================================
// SIDEBAR CLICK EVENTS
// ========================================

menuToggle.addEventListener("click", toggleSidebar);

sidebarOverlay.addEventListener("click", closeSidebar);


// ========================================
// SWIPE LEFT TO CLOSE SIDEBAR
// ========================================

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", function(event) {

  if (!sidebar.classList.contains("open")) {
    return;
  }

  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;

}, { passive: true });


document.addEventListener("touchend", function(event) {

  if (!sidebar.classList.contains("open")) {
    return;
  }

  const touchEndX = event.changedTouches[0].clientX;
  const touchEndY = event.changedTouches[0].clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  // Detect a clear left swipe
  if (
    deltaX < -70 &&
    Math.abs(deltaX) > Math.abs(deltaY) * 1.2
  ) {
    closeSidebar();
  }

}, { passive: true });



// ========================================
// ESCAPE KEY — CLOSE SIDEBAR
// ========================================

document.addEventListener("keydown", function(event) {

  if (
    event.key === "Escape" &&
    sidebar.classList.contains("open")
  ) {
    closeSidebar();
  }

});


// ========================================
// HELP BUTTON
// ========================================

document.getElementById("helpButton")
  .addEventListener("click", function() {

    alert(
  "NEXUS CORE | Enterprise Intelligence\n\n" +
  "This workspace currently displays sample data. " +
  "Live integrations and production services are not connected yet."
);

  });


// ========================================
// REFRESH DATA BUTTON
// ========================================


// ========================================
// PHASE 2 — GLOBAL TIME RANGE SYSTEM
// ========================================

const timeRangeSelect = document.getElementById("timeRangeSelect");


// ========================================
// KEYBOARD / POINTER INTERACTION DETECTION
// ========================================

document.addEventListener("keydown", function(event) {

  if (event.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }

});

document.addEventListener("pointerdown", function() {

  document.body.classList.remove("keyboard-navigation");

});


const chartCaption = document.getElementById("chartCaption");
const refreshButton = document.getElementById("refreshButton");


// ========================================
// SAMPLE DATA CONFIGURATION
// ========================================

const overviewData = {

  "24h": {
    events: [2.40, 2.60],
    success: [99.90, 99.99],
    latency: [78, 92],
    workloads: [130, 165]
  },

  "7d": {
    events: [16.5, 17.5],
    success: [99.90, 99.99],
    latency: [78, 94],
    workloads: [130, 165]
  },

  "30d": {
    events: [70, 74],
    success: [99.89, 99.99],
    latency: [80, 96],
    workloads: [130, 165]
  },

  "90d": {
    events: [210, 225],
    success: [99.88, 99.99],
    latency: [80, 98],
    workloads: [130, 165]
  }

};


// ========================================
// CHART TIME RANGE LABELS
// ========================================

const chartRangeLabels = {

  "24h": [
    "01:00",
    "05:00",
    "09:00",
    "13:00",
    "17:00",
    "21:00"
  ],

  "7d": [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ],

  "30d": [
    "Day 1",
    "Day 6",
    "Day 12",
    "Day 18",
    "Day 24",
    "Day 30"
  ],

  "90d": [
    "Week 1",
    "Week 3",
    "Week 5",
    "Week 7",
    "Week 9",
    "Week 12"
  ]

};


// ========================================
// RANDOM VALUE GENERATOR
// ========================================

function randomBetween(min, max) {

  return min + Math.random() * (max - min);

}


// ========================================
// UPDATE OVERVIEW DATA
// ========================================



function updateKPI(elementId, value, trend, progress) {

  const valueElement = document.getElementById(elementId);

  if (!valueElement) return;

  valueElement.textContent = value;

  const card = valueElement.closest(".kpi-card");

  if (!card) return;

  const trendElement = card.querySelector(".metric-foot span:first-child");

  const progressElement = card.querySelector(".accent-line span");

  if (trendElement) {
    trendElement.textContent = trend;
  }

  if (progressElement) {
    progressElement.style.width =
      Math.min(100, Math.max(0, progress)) + "%";
  }

}


// ========================================
// CHART EVENT DATA GENERATOR
// ========================================

// ========================================
// CHART EVENT DATA GENERATOR
// ========================================

function generateChartData(totalEvents) {

  const chartData = [];
  const weights = [];

  let totalWeight = 0;

  // Generate 12 random distribution weights

  for (let i = 0; i < 12; i++) {

    const weight = randomBetween(0.5, 1.5);

    weights.push(weight);
    totalWeight += weight;

  }

  // Distribute total events across 12 bars

  let allocatedEvents = 0;

  for (let i = 0; i < 12; i++) {

    const events = i === 11
      ? totalEvents - allocatedEvents
      : Math.floor(
          totalEvents * weights[i] / totalWeight
        );

    allocatedEvents += events;

    chartData.push({
      events: events
    });

  }

  return chartData;

}



// ========================================
// WORKLOAD DATA GENERATOR
// ========================================

function generateWorkloadData() {

  return {
    inference: Math.floor(randomBetween(65, 85)),
    pipelines: Math.floor(randomBetween(45, 70)),
    gateway: Math.floor(randomBetween(30, 55)),
    analytics: Math.floor(randomBetween(70, 90))
  };

}



// ========================================
// ACTIVITY DATA GENERATOR
// ========================================

function generateActivityData() {

  const activityTemplates = [
    {
      icon: "↗",
      title: "Pipeline batch completed",
      prefix: "PIPE",
      description: "Analytics ingestion"
    },
    {
      icon: "✳",
      title: "Model evaluation recorded",
      prefix: "MOD",
      description: "Model evaluation"
    },
    {
      icon: "⬡",
      title: "Regional health check completed",
      prefix: "REG",
      description: "Sample service status"
    },
    {
      icon: "≋",
      title: "API event ingested",
      prefix: "EVT",
      description: "Sample request record"
    }
  ];

  const intervals = [
  Math.floor(randomBetween(1, 4)),
  Math.floor(randomBetween(5, 10)),
  Math.floor(randomBetween(11, 18)),
  Math.floor(randomBetween(19, 30))
  ];

  return activityTemplates.map(function(item, index) {

    const randomId = Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();

    return {
      icon: item.icon,
      title: item.title,
      description:
        item.prefix + "-" + randomId +
        " · " + item.description,
      time: intervals[index] + " min ago"
    };

  });

}



// ========================================
// UPDATE OVERVIEW DATA
// ========================================

function updateOverviewData() {

  const selectedRange = timeRangeSelect.value;

  const range = overviewData[selectedRange];

  if (!range) return;


  // Generate sample KPI values

  const events = randomBetween(
    range.events[0],
    range.events[1]
  ).toFixed(2);

  const success = randomBetween(
    range.success[0],
    range.success[1]
  ).toFixed(2);

  const latency = Math.floor(
    randomBetween(range.latency[0], range.latency[1])
  );

  const workloads = Math.floor(
    randomBetween(range.workloads[0], range.workloads[1])
  );


  // Update reusable KPI components

  updateKPI(
    "metricEvents",
    events + "M",
    "↗ " + (randomBetween(8, 15)).toFixed(1) + "%",
    randomBetween(65, 90)
  );

  updateKPI(
    "metricSuccess",
    success + "%",
    "Within target",
    success
  );

  updateKPI(
    "metricLatency",
    latency + " ms",
    "−" + randomBetween(5, 12).toFixed(1) + "%",
    randomBetween(30, 55)
  );

  updateKPI(
    "metricWorkloads",
    workloads,
    "● 12 regions",
    randomBetween(50, 80)
  );


  // Update chart bars using generated event data

const chartData = generateChartData(
  Math.round(Number(events) * 1000000)
);

const maxEvents = Math.max(
  ...chartData.map(function(item) {
    return item.events;
  })
);

chartBarElements.forEach(function(bar, index) {

  const item = chartData[index];

  if (!item) return;

  item.height = Math.max(
    25,
    (item.events / maxEvents) * 100
  );

  bar.style.height = item.height + "%";

  bar.dataset.events = item.events;

});


  // ========================================
// UPDATE WORKLOAD UTILIZATION
// ========================================

const workloadData = generateWorkloadData();

Object.entries(workloadData).forEach(function(entry) {

  const service = entry[0];
  const percentage = entry[1];

  const row = document.querySelector(
    '.service-row[data-service="' + service + '"]'
  );

  if (!row) return;

  const percentageLabel =
    row.querySelector(".service-top span:last-child");

  const progressBar =
    row.querySelector(".service-track span");

  if (percentageLabel) {
    percentageLabel.textContent = percentage + "%";
  }

  if (progressBar) {
    progressBar.style.width = percentage + "%";
  }

});


  // ========================================
// UPDATE RECENT PLATFORM ACTIVITY
// ========================================

const activityData = generateActivityData();

activityList.innerHTML = activityData.map(function(item) {

  return `
    <div class="activity-item">

      <div class="activity-icon">${item.icon}</div>

      <div class="activity-text">
        <strong>${item.title}</strong>
        <p>${item.description}</p>
      </div>

      <span class="activity-time">${item.time}</span>

    </div>
  `;

}).join("");


  // Refresh active tooltip with updated bar height

if (activeTooltipBar) {

  const activeIndex =
    Array.from(chartBarElements).indexOf(activeTooltipBar);

  if (activeIndex !== -1) {

    showChartTooltip(
      activeTooltipBar,
      activeIndex
    );

  }

}


  // Update chart time labels

chartCaption.innerHTML = chartRangeLabels[
  timeRangeSelect.value
].map(function(label) {

  return "<span>" + label + "</span>";

}).join("");


  // Update timestamp

  document.getElementById("updatedAt").textContent =
    "Sample data updated at " +
    new Date().toLocaleTimeString();

}



// ========================================
// PHASE 2 — INTERACTIVE CHART TOOLTIP
// ========================================

const chartTooltip = document.getElementById("chartTooltip");

const chartBarElements =
  document.querySelectorAll("#chartBars .bar");

let activeTooltipBar = null;
let lastChartPointerType = "mouse";


function showChartTooltip(bar, index) {

  const events = Number(bar.dataset.events || 0);

  chartTooltip.textContent =
    "Bar " + (index + 1) +
    " · Sample events: " + events.toLocaleString("en-US");

  chartTooltip.classList.add("visible");

  activeTooltipBar = bar;

}


function hideChartTooltip() {

  chartTooltip.classList.remove("visible");

  activeTooltipBar = null;

}


// Attach interactions to all 12 bars

chartBarElements.forEach(function(bar, index) {

  // Track mouse, touch and pen input

  bar.addEventListener("pointerdown", function(event) {

    lastChartPointerType = event.pointerType;

  });


  // Desktop mouse hover

  bar.addEventListener("pointerenter", function(event) {

    if (event.pointerType === "mouse") {

      showChartTooltip(bar, index);

    }

  });


  bar.addEventListener("pointerleave", function(event) {

    if (event.pointerType === "mouse") {

      hideChartTooltip();

    }

  });


  // Mobile tap

  bar.addEventListener("click", function() {

    if (lastChartPointerType !== "mouse") {

      if (activeTooltipBar === bar) {

        hideChartTooltip();

      } else {

        showChartTooltip(bar, index);

      }

    }

  });

});



// Hide tooltip when clicking outside the chart

document.addEventListener("click", function(event) {

  // Keep tooltip open when Refresh is clicked
  if (event.target.closest("#refreshButton")) {
    return;
  }

  // Keep tooltip open when Time Range is changed
  if (event.target.closest("#timeRangeSelect")) {
    return;
  }

  // Hide tooltip when clicking outside the chart
  if (!event.target.closest("#chartBars")) {

    hideChartTooltip();

  }

});



// ========================================
// TIME RANGE SELECTOR
// ========================================

timeRangeSelect.addEventListener("change", function() {

  updateOverviewData();

});


// ========================================
// REFRESH BUTTON
// ========================================

refreshButton.addEventListener("click", function() {

  const button = this;

  if (button.disabled) return;

  button.disabled = true;

  button.textContent = "Refreshing...";

  button.setAttribute("aria-busy", "true");


  try {

    // Refresh data for the currently selected range

    updateOverviewData();

  } finally {

    setTimeout(function() {

      button.disabled = false;

      button.textContent = "↻ Refresh data";

      button.removeAttribute("aria-busy");

    }, 350);

  }

});

