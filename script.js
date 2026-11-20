
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
const activityList = document.getElementById("activityList");
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



/* ========================================
   PHASE 3 — COMPARATIVE ANALYTICS
   OVERVIEW SHARED STATE
======================================== */

const overviewMetricState = {
  totalEvents: 0,
  successRate: 0,
  averageLatency: 0,
  workloads: 0
};


// Store Overview metrics separately for each time range

// Initialize metrics for all time ranges
const overviewRangeMetrics = {};

Object.keys(overviewData).forEach(function(rangeKey) {

  const range = overviewData[rangeKey];

  const events = randomBetween(
    range.events[0],
    range.events[1]
  );

  const success = randomBetween(
    range.success[0],
    range.success[1]
  );

  const latency = Math.floor(
    randomBetween(range.latency[0], range.latency[1])
  );

  const workloads = Math.floor(
    randomBetween(range.workloads[0], range.workloads[1])
  );

  overviewRangeMetrics[rangeKey] = {
    totalEvents: Number(events.toFixed(2)) * 1000000,
    successRate: Number(success.toFixed(2)),
    averageLatency: latency,
    workloads: workloads
  };

});


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

        
  // Store current Overview metrics in shared state

  overviewMetricState.totalEvents =
    Number(events) * 1000000;

  overviewMetricState.successRate =
    Number(success);

  overviewMetricState.averageLatency =
    latency;

  overviewMetricState.workloads =
    workloads;


// Save metrics for the selected time range
overviewRangeMetrics[selectedRange] = {
  totalEvents: overviewMetricState.totalEvents,
  successRate: overviewMetricState.successRate,
  averageLatency: overviewMetricState.averageLatency,
  workloads: overviewMetricState.workloads
};



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




/* ========================================
   PHASE 3 — TASK 5
   COMPARATIVE ANALYTICS
======================================== */

function updateComparativeAnalytics() {

  const rangeSelect =
    document.getElementById("analyticsComparisonRange");

  const eventsElement =
    document.getElementById("analyticsComparisonEvents");

  const successElement =
    document.getElementById("analyticsComparisonSuccess");

  const latencyElement =
    document.getElementById("analyticsComparisonLatency");

  const eventsDetail =
    document.getElementById("analyticsComparisonEventsDetail");

  const successDetail =
    document.getElementById("analyticsComparisonSuccessDetail");

  const latencyDetail =
    document.getElementById("analyticsComparisonLatencyDetail");

  if (
    !rangeSelect ||
    !eventsElement ||
    !successElement ||
    !latencyElement ||
    !eventsDetail ||
    !successDetail ||
    !latencyDetail
  ) {
    console.warn("Comparative Analytics elements not found.");
    return;
  }

  const selectedRange = rangeSelect.value;
  const range = overviewData[selectedRange];

  if (!range) {
    console.warn("Invalid Comparative Analytics range.");
    return;
  }

  const rangeLabels = {
    "24h": "24-hour",
    "7d": "7-day",
    "30d": "30-day",
    "90d": "90-day"
  };

  
  // Read metrics for the selected comparison range
const comparisonMetrics = overviewRangeMetrics[selectedRange];

if (!comparisonMetrics) {
  console.warn(
    "No saved metrics available for this comparison range."
  );
  return;
}

const currentEvents = comparisonMetrics.totalEvents;
const currentSuccess = comparisonMetrics.successRate;
const currentLatency = comparisonMetrics.averageLatency;

  // Validate current Overview metrics

  if (
    !Number.isFinite(currentEvents) ||
    currentEvents <= 0 ||
    !Number.isFinite(currentSuccess) ||
    currentSuccess <= 0 ||
    !Number.isFinite(currentLatency) ||
    currentLatency <= 0
  ) {
    console.warn(
      "Overview Shared State is not ready for comparison."
    );
    return;
  }


  // Generate previous-period sample baseline

  const targetEventsChange =
    randomBetween(-5, 8);

  const previousEvents =
    currentEvents / (1 + targetEventsChange / 100);

  const targetSuccessChange =
    randomBetween(-0.04, 0.04);

  const previousSuccess =
    currentSuccess - targetSuccessChange;

  const targetLatencyChange =
    randomBetween(-8, 8);

  const previousLatency =
    currentLatency / (1 + targetLatencyChange / 100);

  // Calculate actual comparison changes

  const eventsChange =
    ((currentEvents - previousEvents) / previousEvents) * 100;

  const successChange =
    currentSuccess - previousSuccess;

  const latencyChange =
    ((currentLatency - previousLatency) / previousLatency) * 100;

  // Format comparison values

  function formatChange(value, decimals, suffix) {

    const sign = value > 0 ? "+" : "";

    return sign + value.toFixed(decimals) + suffix;

  }

  // Update comparison KPI values

  eventsElement.textContent =
    formatChange(eventsChange, 2, "%");

  successElement.textContent =
    formatChange(successChange, 3, " pp");

  latencyElement.textContent =
    formatChange(latencyChange, 2, "%");

  // Update comparison descriptions

  const periodLabel = rangeLabels[selectedRange];

  eventsDetail.textContent =
    "vs previous " + periodLabel + " period";

  successDetail.textContent =
    "vs previous " + periodLabel + " period";

  latencyDetail.textContent =
    "vs previous " + periodLabel + " period";

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


// Initialize Overview and Comparative Analytics

updateOverviewData();

updateComparativeAnalytics();


// ========================================
// TIME RANGE SELECTOR
// ========================================

timeRangeSelect.addEventListener("change", function() {

  updateOverviewData();

  updateComparativeAnalytics();

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

    updateComparativeAnalytics();

  } finally {

    setTimeout(function() {

      button.disabled = false;

      button.textContent = "↻ Refresh data";

      button.removeAttribute("aria-busy");

    }, 350);

  }

});


// ========================================
// PHASE 3 — DATA EXPLORER
// TASK 1 — SAMPLE DATA GENERATOR
// ========================================

const dataTableBody = document.getElementById("dataTableBody");
const dataRecordCount = document.getElementById("dataRecordCount");


// ========================================
// DATA EXPLORER CONFIGURATION
// ========================================

const dataEventTemplates = [
  {
    name: "Pipeline batch completed",
    type: "Pipeline",
    source: "Analytics Engine"
  },
  {
    name: "Model inference request",
    type: "Inference",
    source: "AI Gateway"
  },
  {
    name: "API request processed",
    type: "API Request",
    source: "API Gateway"
  },
  {
    name: "Regional health check",
    type: "Health Check",
    source: "Infrastructure"
  },
  {
    name: "Dataset synchronization",
    type: "Data Sync",
    source: "Data Explorer"
  },
  {
    name: "Model evaluation completed",
    type: "Evaluation",
    source: "AI Intelligence"
  },
  {
    name: "User access updated",
    type: "Access",
    source: "Workspace Admin"
  },
  {
    name: "Analytics report generated",
    type: "Analytics",
    source: "Analytics Engine"
  }
];

const dataRecordStatuses = [
  "Success",
  "Success",
  "Success",
  "Pending",
  "Failed"
];


// ========================================
// GENERATE UNIQUE DATA RECORDS
// ========================================

function generateDataExplorerRecords(count) {

  const records = [];

  for (let i = 0; i < count; i++) {

    const template = dataEventTemplates[
      Math.floor(Math.random() * dataEventTemplates.length)
    ];

    const randomId = Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();

    const status = dataRecordStatuses[
      Math.floor(Math.random() * dataRecordStatuses.length)
    ];

    const timestamp = new Date(
      Date.now() - randomBetween(1, 72) * 60 * 60 * 1000
    );

    records.push({
      id: "EVT-" + String(i + 1).padStart(4, "0") +
          "-" + randomId,

      name: template.name,
      type: template.type,
      source: template.source,
      status: status,
      timestamp: timestamp
    });

  }

  return records;

}


// ========================================
// RENDER DATA EXPLORER TABLE
// ========================================

function renderDataExplorerTable(records) {

  if (!dataTableBody || !dataRecordCount) return;

  dataTableBody.replaceChildren();

  records.forEach(function(record) {

    const row = document.createElement("tr");
          row.classList.add("data-record-row");
row.dataset.recordId = record.id;
row.tabIndex = 0;
row.setAttribute("role", "button");

    const values = [
      record.id,
      record.name,
      record.type,
      record.source
    ];

    values.forEach(function(value) {

      const cell = document.createElement("td");

      cell.textContent = value;

      row.appendChild(cell);

    });


    // Status cell

    const statusCell = document.createElement("td");

    const statusLabel = document.createElement("span");

    statusLabel.className =
      "data-record-status status-" +
      record.status.toLowerCase();

    statusLabel.textContent = record.status;

    statusCell.appendChild(statusLabel);

    row.appendChild(statusCell);


    // Timestamp cell

    const timestampCell = document.createElement("td");

    timestampCell.textContent = new Intl.DateTimeFormat(
      "en-US",
      {
        dateStyle: "medium",
        timeStyle: "short"
      }
    ).format(record.timestamp);

    row.appendChild(timestampCell);

    dataTableBody.appendChild(row);

  });


  // Update total record count

  dataRecordCount.textContent =
    records.length + (records.length === 1 ? " record" : " records");

}


// ========================================
// INITIALIZE DATA EXPLORER
// ========================================

const dataExplorerRecords = generateDataExplorerRecords(24);

/* ========================================
   PHASE 3 — TASK 4
   EVENT DISTRIBUTION
======================================== */

function updateAnalyticsEventDistribution() {

  const typeElement =
    document.getElementById("analyticsEventsByType");

  const sourceElement =
    document.getElementById("analyticsEventsBySource");

  if (!typeElement || !sourceElement) {
    console.warn("Event Distribution elements not found.");
    return;
  }

  if (
    !Array.isArray(dataExplorerRecords) ||
    dataExplorerRecords.length === 0
  ) {
    console.warn("Data Explorer records are unavailable.");
    return;
  }

  function generateDistribution(records, field) {

    const counts = {};

    records.forEach(record => {
      const value = record[field];

      if (value) {
        counts[value] = (counts[value] || 0) + 1;
      }
    });

    const entries = Object.entries(counts)
      .sort((a, b) => b[1] - a[1]);

    const total = entries.reduce(
      (sum, entry) => sum + entry[1],
      0
    );

    return entries.map(([label, count]) => {

      const percentage = (count / total) * 100;

      return `
        <div class="analytics-distribution__item">

          <div class="analytics-distribution__heading">
            <span>${label}</span>
            <span>
              ${count.toLocaleString("en-US")}
              (${percentage.toFixed(1)}%)
            </span>
          </div>

          <div class="analytics-distribution__track">
            <div
              class="analytics-distribution__fill"
              style="--distribution-width: ${percentage.toFixed(2)}%"
            ></div>
          </div>

        </div>
      `;
    }).join("");
  }

  typeElement.innerHTML =
    generateDistribution(dataExplorerRecords, "type");

  sourceElement.innerHTML =
    generateDistribution(dataExplorerRecords, "source");
}

updateAnalyticsEventDistribution();


renderDataExplorerTable(dataExplorerRecords);


/* ========================================
   PHASE 3 — SEARCH & FILTERS
   TASK 2 — FILTER ENGINE
======================================== */

const dataSearchInput = document.getElementById("dataSearchInput");
const eventTypeFilter = document.getElementById("eventTypeFilter");
const dataStatusFilter = document.getElementById("dataStatusFilter");

let currentDataPage = 1;
let dataPageSize = 5;

const paginationInfo = document.getElementById("paginationInfo");
const currentPageInfo = document.getElementById("currentPageInfo");
const pageSizeSelect = document.getElementById("pageSizeSelect");
const previousPageBtn = document.getElementById("previousPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const exportDataCSV = document.getElementById("exportDataCSV");


let dataSortKey = null;
let dataSortDirection = "ascending";
let currentFilteredDataRecords = [];


function filterDataExplorerRecords() {
  if (!dataSearchInput || !eventTypeFilter || !dataStatusFilter) {
    return;
  }

  const searchTerm = dataSearchInput.value.trim().toLowerCase();
  const selectedType = eventTypeFilter.value;
  const selectedStatus = dataStatusFilter.value;

  const filteredRecords = dataExplorerRecords.filter(function(record) {
    
const formattedTimestamp = new Intl.DateTimeFormat(
  "en-US",
  { dateStyle: "medium", timeStyle: "short" }
).format(record.timestamp);

const searchableText = [
  record.id,
  record.name,
  record.type,
  record.source,
  record.status,
  formattedTimestamp
].join(" ").toLowerCase();


    const matchesSearch = searchableText.includes(searchTerm);

    const matchesType =
      selectedType === "all" || record.type === selectedType;

    const matchesStatus =
      selectedStatus === "all" || record.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  
if (dataSortKey) {
  filteredRecords.sort(function(a, b) {
    let comparison = 0;

    if (dataSortKey === "timestamp") {
      comparison = a.timestamp.getTime() - b.timestamp.getTime();
    } else {
      comparison = String(a[dataSortKey]).localeCompare(
        String(b[dataSortKey]),
        undefined,
        { numeric: true, sensitivity: "base" }
      );
    }

    return dataSortDirection === "ascending"
      ? comparison
      : -comparison;
  });
}

currentFilteredDataRecords = filteredRecords;

renderPaginatedDataExplorerTable(filteredRecords);

}

if (dataSearchInput && eventTypeFilter && dataStatusFilter) {
  dataSearchInput.addEventListener("input", function() {
  currentDataPage = 1;
  filterDataExplorerRecords();
});

eventTypeFilter.addEventListener("change", function() {
  currentDataPage = 1;
  filterDataExplorerRecords();
});

dataStatusFilter.addEventListener("change", function() {
  currentDataPage = 1;
  filterDataExplorerRecords();
});
}


/* ========================================
   PHASE 3 — COLUMN SORTING
   TASK 3 — SORT ENGINE
======================================== */

const sortableHeaders = document.querySelectorAll(
  ".data-table th.sortable"
);

function updateSortIndicators() {
  sortableHeaders.forEach(function(header) {
    const indicator = header.querySelector(".sort-indicator");
    const sortKey = header.dataset.sort;

    if (sortKey === dataSortKey) {
      header.setAttribute(
        "aria-sort",
        dataSortDirection === "ascending"
          ? "ascending"
          : "descending"
      );

      indicator.textContent =
        dataSortDirection === "ascending" ? "↑" : "↓";
    } else {
      header.setAttribute("aria-sort", "none");
      indicator.textContent = "↕";
    }
  });
}

sortableHeaders.forEach(function(header) {
  header.addEventListener("click", function() {
    const selectedKey = header.dataset.sort;

    if (dataSortKey === selectedKey) {
      dataSortDirection =
        dataSortDirection === "ascending"
          ? "descending"
          : "ascending";
    } else {
      dataSortKey = selectedKey;
      dataSortDirection = "ascending";
    }

    updateSortIndicators();
    filterDataExplorerRecords();
  });
});

updateSortIndicators();


/* ========================================
   NEXUS CORE — PAGINATION ENGINE
   PHASE 3 · TASK 4
======================================== */

function renderPaginatedDataExplorerTable(records) {
  if (
    !paginationInfo ||
    !currentPageInfo ||
    !pageSizeSelect ||
    !previousPageBtn ||
    !nextPageBtn
  ) {
    return;
  }

  const totalRecords = records.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalRecords / dataPageSize)
  );

  currentDataPage = Math.min(currentDataPage, totalPages);

  const startIndex = (currentDataPage - 1) * dataPageSize;
  const endIndex = Math.min(
    startIndex + dataPageSize,
    totalRecords
  );

  const pageRecords = records.slice(startIndex, endIndex);

  renderDataExplorerTable(pageRecords);

  if (dataRecordCount) {
    dataRecordCount.textContent =
      totalRecords + (totalRecords === 1 ? " record" : " records");
  }

  paginationInfo.textContent = totalRecords === 0
    ? "Showing 0–0 of 0 records"
    : "Showing " + (startIndex + 1) + "–" +
      endIndex + " of " + totalRecords + " records";

  currentPageInfo.textContent =
    "Page " + currentDataPage + " of " + totalPages;

  previousPageBtn.disabled = currentDataPage === 1;
  nextPageBtn.disabled = currentDataPage === totalPages;
}

if (
  pageSizeSelect &&
  previousPageBtn &&
  nextPageBtn
) {
  pageSizeSelect.addEventListener("change", function() {
    dataPageSize = Number(pageSizeSelect.value);
    currentDataPage = 1;
    filterDataExplorerRecords();
  });

  previousPageBtn.addEventListener("click", function() {
    if (currentDataPage > 1) {
      currentDataPage--;
      filterDataExplorerRecords();
    }
  });

  nextPageBtn.addEventListener("click", function() {
    currentDataPage++;
    filterDataExplorerRecords();
  });
}

filterDataExplorerRecords();


/* ========================================
   NEXUS CORE — RECORD DRILL-DOWN
   PHASE 3 · TASK 5
======================================== */

const recordDetailDialog = document.getElementById("recordDetailDialog");
const closeRecordDetail = document.getElementById("closeRecordDetail");

const detailRecordId = document.getElementById("detailRecordId");
const detailEventName = document.getElementById("detailEventName");
const detailEventType = document.getElementById("detailEventType");
const detailEventSource = document.getElementById("detailEventSource");
const detailEventStatus = document.getElementById("detailEventStatus");
const detailEventTimestamp = document.getElementById("detailEventTimestamp");

function openRecordDetails(record) {
  if (!record || !recordDetailDialog) return;

  detailRecordId.textContent = record.id;
  detailEventName.textContent = record.name;
  detailEventType.textContent = record.type;
  detailEventSource.textContent = record.source;
  detailEventStatus.textContent = record.status;

  detailEventTimestamp.textContent = new Intl.DateTimeFormat(
    "en-US",
    { dateStyle: "medium", timeStyle: "short" }
  ).format(record.timestamp);

  recordDetailDialog.showModal();
}

function handleRecordSelection(event) {
  const row = event.target.closest("tr[data-record-id]");

  if (!row || !dataTableBody.contains(row)) return;

  const selectedRecord = dataExplorerRecords.find(function(record) {
    return record.id === row.dataset.recordId;
  });

  openRecordDetails(selectedRecord);
}

if (dataTableBody) {
  dataTableBody.addEventListener("click", handleRecordSelection);

  dataTableBody.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === " ") {
      const row = event.target.closest("tr[data-record-id]");

      if (!row) return;

      event.preventDefault();
      handleRecordSelection(event);
    }
  });
}

if (closeRecordDetail && recordDetailDialog) {
  closeRecordDetail.addEventListener("click", function() {
    recordDetailDialog.close();
  });

  recordDetailDialog.addEventListener("click", function(event) {
    if (event.target === recordDetailDialog) {
      recordDetailDialog.close();
    }
  });
}


// ========================================
// NEXUS CORE — CSV EXPORT ENGINE
// ========================================

function escapeCSVValue(value) {
  const text = String(value ?? "");

  return '"' + text.replace(/"/g, '""') + '"';
}


function downloadDataExplorerCSV() {

  if (!currentFilteredDataRecords.length) {
    return;
  }

  const csvHeaders = [
    "Record ID",
    "Event Name",
    "Event Type",
    "Source",
    "Status",
    "Timestamp"
  ];

  const dateFormatter = new Intl.DateTimeFormat(
    "en-US",
    {
      dateStyle: "medium",
      timeStyle: "short"
    }
  );

  const csvRows = currentFilteredDataRecords.map(function(record) {

    const formattedTimestamp = dateFormatter.format(
      record.timestamp
    );

    return [
      record.id,
      record.name,
      record.type,
      record.source,
      record.status,
      formattedTimestamp
    ].map(escapeCSVValue).join(",");

  });

  const csvContent = [
    csvHeaders.map(escapeCSVValue).join(","),
    ...csvRows
  ].join("\r\n");

  const csvBlob = new Blob(
  [csvContent],
  {
    type: "text/csv;charset=utf-8;"
  }
);

  const downloadURL = URL.createObjectURL(csvBlob);

  const downloadLink = document.createElement("a");

  downloadLink.href = downloadURL;

  downloadLink.download =
    "nexus-core-data-export-" +
    new Date().toISOString().slice(0, 10) +
    ".csv";

  document.body.appendChild(downloadLink);

  downloadLink.click();

  downloadLink.remove();

  setTimeout(function() {
    URL.revokeObjectURL(downloadURL);
  }, 1000);
}

// ========================================
// CSV EXPORT — BUTTON EVENT
// ========================================

if (exportDataCSV) {
  exportDataCSV.addEventListener("click", function() {
    downloadDataExplorerCSV();
  });
}


/* ========================================
   PHASE 3 — SHARED ANALYTICS DATA
======================================== */

const analyticsMetricState = {
  totalEvents: 0,
  successRate: 0,
  averageLatency: 0,
  failedEvents: 0
};


/* ========================================
   PHASE 3 — ANALYTICS & INSIGHTS
   TASK 1 — ANALYTICS KPI GENERATOR
======================================== */

function generateAnalyticsMetrics() {

  // Generate sample analytics values

  const totalEvents = Math.floor(
    randomBetween(2400000, 2600000)
  );

  const successRate = randomBetween(
    99.90,
    99.99
  );

  const averageLatency = Math.floor(
    randomBetween(70, 110)
  );

  const failedEvents = Math.round(
    totalEvents * (1 - successRate / 100)
  );


        // Store exact Analytics values in shared state

analyticsMetricState.totalEvents = totalEvents;

analyticsMetricState.successRate = successRate;

analyticsMetricState.averageLatency = averageLatency;

analyticsMetricState.failedEvents = failedEvents;


  // Update Analytics KPI cards

  const totalEventsElement = document.getElementById(
    "analyticsTotalEvents"
  );

  const successRateElement = document.getElementById(
    "analyticsSuccessRate"
  );

  const averageLatencyElement = document.getElementById(
    "analyticsAverageLatency"
  );

  const failedEventsElement = document.getElementById(
    "analyticsFailedEvents"
  );


  if (totalEventsElement) {
    totalEventsElement.textContent =
      (totalEvents / 1000000).toFixed(2) + "M";
  }

  if (successRateElement) {
    successRateElement.textContent =
      successRate.toFixed(2) + "%";
  }

  if (averageLatencyElement) {
    averageLatencyElement.textContent =
      averageLatency + " ms";
  }

  if (failedEventsElement) {
    failedEventsElement.textContent =
      failedEvents.toLocaleString("en-US");
  }

}


// Initialize Analytics Overview

generateAnalyticsMetrics();



/* ========================================
   PHASE 3 — TASK 3
   PERFORMANCE ANALYTICS
======================================== */

function updateAnalyticsPerformance() {

  const successRateElement =
    document.getElementById("analyticsPerformanceSuccessRate");

  const failureRateElement =
    document.getElementById("analyticsPerformanceFailureRate");

  const latencyElement =
    document.getElementById("analyticsPerformanceLatency");

  if (
    !successRateElement ||
    !failureRateElement ||
    !latencyElement
  ) {
    console.warn("Performance Analytics elements not found.");
    return;
  }

  const totalEvents = analyticsMetricState.totalEvents;
  const successRate = analyticsMetricState.successRate;
  const failedEvents = analyticsMetricState.failedEvents;
  const averageLatency = analyticsMetricState.averageLatency;

  if (
    !Number.isFinite(totalEvents) ||
    totalEvents <= 0 ||
    !Number.isFinite(successRate) ||
    !Number.isFinite(failedEvents) ||
    !Number.isFinite(averageLatency)
  ) {
    console.warn("Invalid Performance Analytics shared data.");
    return;
  }

  const failureRate =
    (failedEvents / totalEvents) * 100;

  successRateElement.textContent =
    successRate.toFixed(2) + "%";

  failureRateElement.textContent =
    failureRate.toFixed(4) + "%";

  latencyElement.textContent =
    averageLatency + " ms";
}

updateAnalyticsPerformance();



/* ========================================
   PHASE 3 — ANALYTICS & INSIGHTS
   TASK 1 — KPI TREND INDICATORS
======================================== */

function generateAnalyticsTrends() {

  const analyticsPage = document.getElementById(
    "page-analytics"
  );

  if (!analyticsPage) return;

  const trendElements = analyticsPage.querySelectorAll(
    ".metric-foot .muted"
  );

  if (trendElements.length !== 4) {
    console.warn("Analytics KPI trend elements not found.");
    return;
  }

  // Generate sample trend percentages

  const totalEventsTrend = randomBetween(2.1, 5.8);
  const successRateTrend = randomBetween(0.02, 0.12);
  const latencyTrend = randomBetween(1.5, 6.5);
  const failedEventsTrend = randomBetween(2.0, 8.0);

  // Update KPI trend information

  trendElements[0].textContent =
    "↑ " + totalEventsTrend.toFixed(2) +
    "% vs previous period";

  trendElements[1].textContent =
    "↑ " + successRateTrend.toFixed(2) +
    " percentage points vs previous period";

  trendElements[2].textContent =
    "↓ " + latencyTrend.toFixed(2) +
    "% vs previous period";

  trendElements[3].textContent =
    "↓ " + failedEventsTrend.toFixed(2) +
    "% vs previous period";

}

// Initialize Analytics KPI Trends

generateAnalyticsTrends();


/* ========================================
   PHASE 3 — ANALYTICS & INSIGHTS
   TASK 1 — KPI PROGRESS CALCULATIONS
======================================== */

function updateAnalyticsProgressBars() {

  // Read current Analytics KPI values

  const totalEventsElement = document.getElementById(
    "analyticsTotalEvents"
  );

  const successRateElement = document.getElementById(
    "analyticsSuccessRate"
  );

  const latencyElement = document.getElementById(
    "analyticsAverageLatency"
  );

  const failedEventsElement = document.getElementById(
    "analyticsFailedEvents"
  );

  if (
    !totalEventsElement ||
    !successRateElement ||
    !latencyElement ||
    !failedEventsElement
  ) {
    return;
  }

  
  // Read exact values from shared Analytics state

  const totalEvents = analyticsMetricState.totalEvents;

  const successRate = analyticsMetricState.successRate;

  const averageLatency = analyticsMetricState.averageLatency;

  const failedEvents = analyticsMetricState.failedEvents;


  if (
    !Number.isFinite(totalEvents) ||
    !Number.isFinite(successRate) ||
    !Number.isFinite(averageLatency) ||
    !Number.isFinite(failedEvents) ||
    totalEvents <= 0 ||
    averageLatency < 0 ||
    failedEvents < 0
  ) {
    console.warn("Invalid Analytics KPI values.");
    return;
  }

  // Calculate progress percentages

  const totalEventsProgress =
    (totalEvents / 3000000) * 100;

  const successRateProgress =
    successRate;

  const latencyProgress =
    ((200 - averageLatency) / 200) * 100;

  const failureRate =
    (failedEvents / totalEvents) * 100;

  const failedEventsProgress =
    100 - (failureRate / 0.2) * 100;


  // Keep all progress values between 0 and 100

  const progressValues = [
    totalEventsProgress,
    successRateProgress,
    latencyProgress,
    failedEventsProgress
  ].map(value =>
    Math.max(0, Math.min(100, value))
  );


  // Progress bar element IDs

  const progressIds = [
    "analyticsTotalEvents",
    "analyticsSuccessRate",
    "analyticsAverageLatency",
    "analyticsFailedEvents"
  ];


  // Update progress bars and accessibility values

  progressIds.forEach((id, index) => {

    const progressElement = document.getElementById(
      id + "Progress"
    );

    const fillElement = document.getElementById(
      id + "ProgressFill"
    );

    if (!progressElement || !fillElement) return;

    const progress = progressValues[index];

    progressElement.setAttribute(
      "aria-valuenow",
      progress.toFixed(2)
    );

    fillElement.style.width = progress + "%";

  });

}


// Initialize Analytics Progress Bars

updateAnalyticsProgressBars();


/* ========================================
   PHASE 3 — ANALYTICS & INSIGHTS
   TASK 2 — EVENTS OVER TIME
   STEP 2 — CHART DATA GENERATOR
======================================== */

function generateAnalyticsEventsTrend() {

  const chartElement = document.getElementById(
  "analyticsEventsTrendChart"
);

if (!chartElement) {
  console.warn("Analytics Events Trend element not found.");
  return;
}

// Read exact Total Events from shared state

const totalEvents = analyticsMetricState.totalEvents;

if (!Number.isFinite(totalEvents) || totalEvents <= 0) {
  console.warn("Invalid Analytics shared Total Events value.");
  return;
}

  // Twelve two-hour intervals covering 24 hours

  const intervals = [
    "00:00", "02:00", "04:00", "06:00",
    "08:00", "10:00", "12:00", "14:00",
    "16:00", "18:00", "20:00", "22:00"
  ];

  // Distribution weights: total = 2440

  const weights = [
    168, 182, 195, 176,
    205, 214, 198, 226,
    235, 218, 207, 216
  ];

  const weightTotal = weights.reduce(
    (sum, value) => sum + value,
    0
  );

  // Generate event counts for each interval

  let allocatedEvents = 0;

  const trendData = weights.map((weight, index) => {

    let events;

    if (index === weights.length - 1) {
      events = totalEvents - allocatedEvents;
    } else {
      events = Math.round(
        totalEvents * (weight / weightTotal)
      );

      allocatedEvents += events;
    }

    return {
      label: intervals[index],
      events: events
    };

  });

  // Find the maximum value for chart scaling

  const maximumEvents = Math.max(
    ...trendData.map(item => item.events)
  );

  // Render chart columns

  const chartMarkup = trendData.map(item => {

    const barHeight = (
      item.events / maximumEvents
    ) * 100;

    return `
      <div
        class="analytics-trend-chart__column"
        data-event-count="${item.events}"
        aria-label="${item.label}: ${item.events.toLocaleString("en-US")} events"
      >
        <span class="analytics-trend-chart__value">
          ${item.events.toLocaleString("en-US")}
        </span>

        <div class="analytics-trend-chart__bar-track">
          <div
            class="analytics-trend-chart__bar-fill"
            style="--bar-height: ${barHeight.toFixed(2)}%"
          ></div>
        </div>

        <span class="analytics-trend-chart__label">
          ${item.label}
        </span>
      </div>
    `;

  }).join("");

  chartElement.innerHTML = `
    <div
      class="analytics-trend-chart__plot"
      data-total-events="${totalEvents}"
    >
      ${chartMarkup}
    </div>
  `;

}


// Initialize Events Over Time Chart

generateAnalyticsEventsTrend();

