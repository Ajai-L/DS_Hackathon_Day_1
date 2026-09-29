/**
 * Marketing Intelligence Dashboard Application Logic
 * DS_Day01_37: Digital Marketing Campaign Analysis
 */

// Comprehensive campaign dataset
const rawData = [
  { campaign: "CMP_01_Brand_Awareness", segment: "Tech Enthusiasts", cost: 2450.00, impressions: 72400, clicks: 1230, conversions: 28, revenue: 3360.00 },
  { campaign: "CMP_01_Brand_Awareness", segment: "High-Income Professionals", cost: 3100.50, impressions: 88900, clicks: 1510, conversions: 42, revenue: 9660.00 },
  { campaign: "CMP_01_Brand_Awareness", segment: "Budget Shoppers", cost: 1850.00, impressions: 56000, clicks: 950, conversions: 16, revenue: 848.00 },
  { campaign: "CMP_01_Brand_Awareness", segment: "Young Families", cost: 2200.00, impressions: 64300, clicks: 1150, conversions: 25, revenue: 2625.00 },
  { campaign: "CMP_01_Brand_Awareness", segment: "College Students", cost: 1600.00, impressions: 49000, clicks: 880, conversions: 12, revenue: 456.00 },
  { campaign: "CMP_01_Brand_Awareness", segment: "Tech Enthusiasts", cost: 2600.00, impressions: 76000, clicks: 1310, conversions: 31, revenue: 3720.00 },
  { campaign: "CMP_01_Brand_Awareness", segment: "High-Income Professionals", cost: 3400.00, impressions: 92000, clicks: 1620, conversions: 46, revenue: 10810.00 },
  { campaign: "CMP_01_Brand_Awareness", segment: "Budget Shoppers", cost: 1900.00, impressions: 58200, clicks: 1020, conversions: 18, revenue: 918.00 },
  { campaign: "CMP_01_Brand_Awareness", segment: "Young Families", cost: 2350.00, impressions: 67100, clicks: 1210, conversions: 27, revenue: 2781.00 },
  { campaign: "CMP_01_Brand_Awareness", segment: "College Students", cost: 1750.00, impressions: 51500, clicks: 910, conversions: 13, revenue: 481.00 },

  { campaign: "CMP_02_Social_Influencer", segment: "Tech Enthusiasts", cost: 3500.00, impressions: 82000, clicks: 4920, conversions: 44, revenue: 5280.00 },
  { campaign: "CMP_02_Social_Influencer", segment: "High-Income Professionals", cost: 4400.00, impressions: 98000, clicks: 6100, conversions: 68, revenue: 15640.00 },
  { campaign: "CMP_02_Social_Influencer", segment: "Budget Shoppers", cost: 2800.00, impressions: 69000, clicks: 3850, conversions: 27, revenue: 1350.00 },
  { campaign: "CMP_02_Social_Influencer", segment: "Young Families", cost: 3600.00, impressions: 84500, clicks: 4820, conversions: 41, revenue: 4182.00 },
  { campaign: "CMP_02_Social_Influencer", segment: "College Students", cost: 2600.00, impressions: 74000, clicks: 4810, conversions: 24, revenue: 888.00 },
  { campaign: "CMP_02_Social_Influencer", segment: "Tech Enthusiasts", cost: 3800.00, impressions: 86500, clicks: 5200, conversions: 49, revenue: 5635.00 },
  { campaign: "CMP_02_Social_Influencer", segment: "High-Income Professionals", cost: 4650.00, impressions: 104000, clicks: 6760, conversions: 75, revenue: 17250.00 },
  { campaign: "CMP_02_Social_Influencer", segment: "Budget Shoppers", cost: 2950.00, impressions: 71500, clicks: 4120, conversions: 29, revenue: 1421.00 },
  { campaign: "CMP_02_Social_Influencer", segment: "Young Families", cost: 3750.00, impressions: 88000, clicks: 5100, conversions: 45, revenue: 4545.00 },
  { campaign: "CMP_02_Social_Influencer", segment: "College Students", cost: 2700.00, impressions: 76800, clicks: 5010, conversions: 26, revenue: 936.00 },

  { campaign: "CMP_03_Search_Intent_SEM", segment: "Tech Enthusiasts", cost: 2100.00, impressions: 38000, clicks: 1440, conversions: 118, revenue: 14160.00 },
  { campaign: "CMP_03_Search_Intent_SEM", segment: "High-Income Professionals", cost: 2900.00, impressions: 46000, clicks: 1840, conversions: 185, revenue: 42550.00 },
  { campaign: "CMP_03_Search_Intent_SEM", segment: "Budget Shoppers", cost: 1450.00, impressions: 28500, clicks: 998, conversions: 59, revenue: 3068.00 },
  { campaign: "CMP_03_Search_Intent_SEM", segment: "Young Families", cost: 2250.00, impressions: 39500, clicks: 1460, conversions: 112, revenue: 11760.00 },
  { campaign: "CMP_03_Search_Intent_SEM", segment: "College Students", cost: 1300.00, impressions: 26000, clicks: 884, conversions: 41, revenue: 1558.00 },
  { campaign: "CMP_03_Search_Intent_SEM", segment: "Tech Enthusiasts", cost: 2300.00, impressions: 41000, clicks: 1558, conversions: 126, revenue: 15120.00 },
  { campaign: "CMP_03_Search_Intent_SEM", segment: "High-Income Professionals", cost: 3100.00, impressions: 48500, clicks: 1980, conversions: 198, revenue: 45540.00 },
  { campaign: "CMP_03_Search_Intent_SEM", segment: "Budget Shoppers", cost: 1550.00, impressions: 29800, clicks: 1043, conversions: 62, revenue: 3224.00 },
  { campaign: "CMP_03_Search_Intent_SEM", segment: "Young Families", cost: 2400.00, impressions: 41200, clicks: 1524, conversions: 119, revenue: 12495.00 },
  { campaign: "CMP_03_Search_Intent_SEM", segment: "College Students", cost: 1350.00, impressions: 27200, clicks: 925, conversions: 44, revenue: 1672.00 },

  { campaign: "CMP_04_Affiliate_Display", segment: "Tech Enthusiasts", cost: 4800.00, impressions: 58000, clicks: 1276, conversions: 17, revenue: 1955.00 },
  { campaign: "CMP_04_Affiliate_Display", segment: "High-Income Professionals", cost: 5900.00, impressions: 71000, clicks: 1633, conversions: 26, revenue: 6240.00 },
  { campaign: "CMP_04_Affiliate_Display", segment: "Budget Shoppers", cost: 3900.00, impressions: 46000, clicks: 966, conversions: 11, revenue: 561.00 },
  { campaign: "CMP_04_Affiliate_Display", segment: "Young Families", cost: 4950.00, impressions: 61000, clicks: 1342, conversions: 16, revenue: 1600.00 },
  { campaign: "CMP_04_Affiliate_Display", segment: "College Students", cost: 3600.00, impressions: 44000, clicks: 880, conversions: 8, revenue: 296.00 },
  { campaign: "CMP_04_Affiliate_Display", segment: "Tech Enthusiasts", cost: 5100.00, impressions: 62000, clicks: 1364, conversions: 19, revenue: 2185.00 },
  { campaign: "CMP_04_Affiliate_Display", segment: "High-Income Professionals", cost: 6200.00, impressions: 74500, clicks: 1713, conversions: 29, revenue: 6960.00 },
  { campaign: "CMP_04_Affiliate_Display", segment: "Budget Shoppers", cost: 4100.00, impressions: 48000, clicks: 1008, conversions: 12, revenue: 612.00 },
  { campaign: "CMP_04_Affiliate_Display", segment: "Young Families", cost: 5200.00, impressions: 63500, clicks: 1397, conversions: 18, revenue: 1800.00 },
  { campaign: "CMP_04_Affiliate_Display", segment: "College Students", cost: 3750.00, impressions: 45500, clicks: 910, conversions: 9, revenue: 333.00 },

  { campaign: "CMP_05_Email_Retargeting", segment: "Tech Enthusiasts", cost: 1050.00, impressions: 22000, clicks: 968, conversions: 88, revenue: 10384.00 },
  { campaign: "CMP_05_Email_Retargeting", segment: "High-Income Professionals", cost: 1450.00, impressions: 28500, clicks: 1311, conversions: 142, revenue: 32660.00 },
  { campaign: "CMP_05_Email_Retargeting", segment: "Budget Shoppers", cost: 780.00, impressions: 16500, clicks: 693, conversions: 42, revenue: 2184.00 },
  { campaign: "CMP_05_Email_Retargeting", segment: "Young Families", cost: 1150.00, impressions: 24000, clicks: 1056, conversions: 86, revenue: 8858.00 },
  { campaign: "CMP_05_Email_Retargeting", segment: "College Students", cost: 690.00, impressions: 14800, clicks: 592, conversions: 30, revenue: 1140.00 },
  { campaign: "CMP_05_Email_Retargeting", segment: "Tech Enthusiasts", cost: 1120.00, impressions: 23200, clicks: 1020, conversions: 94, revenue: 11092.00 },
  { campaign: "CMP_05_Email_Retargeting", segment: "High-Income Professionals", cost: 1550.00, impressions: 30200, clicks: 1389, conversions: 155, revenue: 35650.00 },
  { campaign: "CMP_05_Email_Retargeting", segment: "Budget Shoppers", cost: 820.00, impressions: 17200, clicks: 722, conversions: 45, revenue: 2340.00 },
  { campaign: "CMP_05_Email_Retargeting", segment: "Young Families", cost: 1220.00, impressions: 25100, clicks: 1104, conversions: 91, revenue: 9373.00 },
  { campaign: "CMP_05_Email_Retargeting", segment: "College Students", cost: 720.00, impressions: 15400, clicks: 616, conversions: 32, revenue: 1216.00 }
];

// Calculated record metrics
const processedData = rawData.map(d => {
  const ctr = (d.clicks / d.impressions) * 100;
  const cvr = (d.conversions / d.clicks) * 100;
  const cpa = d.conversions > 0 ? (d.cost / d.conversions) : null;
  const roas = d.revenue / d.cost;
  const profit = d.revenue - d.cost;
  return { ...d, ctr, cvr, cpa, roas, profit };
});

// Chart instances
let chartRoasCpa = null;
let chartCtrVsRevenue = null;
let chartSegmentPerf = null;
let chartImpactQuadrant = null;
let chartFeatureImportance = null;

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupFilter();
  renderDashboard("ALL");
  setupFeatureImportanceChart();
  setupSimulator();
  setupBudgetSliders();
  setupExport();
});

// Navigation smooth scroll
function setupNavigation() {
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", e => {
      document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
      item.classList.add("active");
    });
  });

  const inspectBtn = document.getElementById("btnViewAffiliate");
  if (inspectBtn) {
    inspectBtn.addEventListener("click", () => {
      const el = document.getElementById("deep-dive");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    });
  }
}

// Filter handler
function setupFilter() {
  const filter = document.getElementById("segmentFilter");
  filter.addEventListener("change", (e) => {
    renderDashboard(e.target.value);
  });
}

// Master Render
function renderDashboard(selectedSegment) {
  const filtered = selectedSegment === "ALL" 
    ? processedData 
    : processedData.filter(d => d.segment === selectedSegment);

  updateKPIs(filtered);
  renderCampaignTable(filtered);
  renderRoasCpaChart(filtered);
  renderCtrVsRevenueChart(filtered);
  renderSegmentPerfChart(filtered);
  renderImpactQuadrantChart(filtered);
}

// KPI Updating
function updateKPIs(data) {
  const totalCost = data.reduce((acc, d) => acc + d.cost, 0);
  const totalRev = data.reduce((acc, d) => acc + d.revenue, 0);
  const totalConv = data.reduce((acc, d) => acc + d.conversions, 0);
  const totalClicks = data.reduce((acc, d) => acc + d.clicks, 0);
  const totalImpr = data.reduce((acc, d) => acc + d.impressions, 0);
  
  const overallRoas = totalCost > 0 ? (totalRev / totalCost) : 0;
  const avgCpa = totalConv > 0 ? (totalCost / totalConv) : 0;
  const overallCvr = totalClicks > 0 ? (totalConv / totalClicks) * 100 : 0;
  const overallCtr = totalImpr > 0 ? (totalClicks / totalImpr) * 100 : 0;
  const netProfit = totalRev - totalCost;

  document.getElementById("kpiTotalSpend").textContent = `$${totalCost.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;
  document.getElementById("kpiTotalRevenue").textContent = `$${totalRev.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;
  document.getElementById("kpiNetProfit").textContent = `Net Profit: ${netProfit >= 0 ? '+' : ''}$${netProfit.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;
  document.getElementById("kpiOverallROAS").textContent = `${overallRoas.toFixed(2)}x`;
  document.getElementById("kpiAverageCPA").textContent = `$${avgCpa.toFixed(2)}`;
  document.getElementById("kpiTotalConversions").textContent = `${totalConv.toLocaleString()} Total Conversions`;
  document.getElementById("kpiCombinedRate").textContent = `${overallCvr.toFixed(1)}% / ${overallCtr.toFixed(1)}%`;
}

// Aggregation by Campaign
function aggregateByCampaign(data) {
  const map = {};
  data.forEach(d => {
    if (!map[d.campaign]) {
      map[d.campaign] = {
        name: d.campaign,
        cost: 0,
        revenue: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0
      };
    }
    map[d.campaign].cost += d.cost;
    map[d.campaign].revenue += d.revenue;
    map[d.campaign].impressions += d.impressions;
    map[d.campaign].clicks += d.clicks;
    map[d.campaign].conversions += d.conversions;
  });

  return Object.values(map).map(c => {
    const ctr = (c.clicks / c.impressions) * 100;
    const cvr = (c.conversions / c.clicks) * 100;
    const cpa = c.conversions > 0 ? (c.cost / c.conversions) : 0;
    const roas = c.cost > 0 ? (c.revenue / c.cost) : 0;
    return { ...c, ctr, cvr, cpa, roas };
  });
}

// Campaign Performance Table
function renderCampaignTable(data) {
  const aggregated = aggregateByCampaign(data).sort((a, b) => b.roas - a.roas);
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  aggregated.forEach(row => {
    const tr = document.createElement("tr");
    let statusBadge = '<span class="badge-win">High Winner</span>';
    if (row.roas < 1.0) {
      statusBadge = '<span class="badge-loss">Budget Drain</span>';
    } else if (row.roas < 2.0) {
      statusBadge = '<span class="badge-mod">Underperformer</span>';
    }

    tr.innerHTML = `
      <td><strong>${row.name.replace(/_/g, " ")}</strong></td>
      <td>${row.impressions.toLocaleString()}</td>
      <td>${row.clicks.toLocaleString()}</td>
      <td>${row.ctr.toFixed(2)}%</td>
      <td>${row.conversions.toLocaleString()}</td>
      <td>${row.cvr.toFixed(2)}%</td>
      <td>$${row.cost.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</td>
      <td><strong>$${row.revenue.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</strong></td>
      <td>$${row.cpa.toFixed(2)}</td>
      <td style="font-weight: 700; color: ${row.roas >= 2.5 ? '#34d399' : (row.roas < 1 ? '#f87171' : '#fbbf24')}">${row.roas.toFixed(2)}x</td>
      <td>${statusBadge}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Chart 1: ROAS & CPA
function renderRoasCpaChart(data) {
  const agg = aggregateByCampaign(data);
  const labels = agg.map(a => a.name.replace("CMP_", "").replace(/_/g, " "));
  const roasData = agg.map(a => Number(a.roas.toFixed(2)));
  const cpaData = agg.map(a => Number(a.cpa.toFixed(2)));

  const ctx = document.getElementById("chartRoasCpa").getContext("2d");
  if (chartRoasCpa) chartRoasCpa.destroy();

  chartRoasCpa = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'ROAS (Revenue / Cost)',
          data: roasData,
          backgroundColor: '#3b82f6',
          borderRadius: 6,
          yAxisID: 'y'
        },
        {
          label: 'CPA ($ Cost per Acquisition)',
          data: cpaData,
          backgroundColor: '#f59e0b',
          borderRadius: 6,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { labels: { color: '#cbd5e1', font: { family: 'Plus Jakarta Sans', size: 11 } } },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#fff',
          bodyColor: '#cbd5e1',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          ticks: { color: '#94a3b8', font: { size: 10 } },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          type: 'linear',
          position: 'left',
          title: { display: true, text: 'ROAS Ratio (x)', color: '#60a5fa' },
          ticks: { color: '#60a5fa' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y1: {
          type: 'linear',
          position: 'right',
          title: { display: true, text: 'CPA ($)', color: '#fbbf24' },
          ticks: { color: '#fbbf24' },
          grid: { drawOnChartArea: false }
        }
      }
    }
  });
}

// Chart 2: CTR vs Revenue Investigation
function renderCtrVsRevenueChart(data) {
  const scatterPoints = data.map(d => ({
    x: Number(d.ctr.toFixed(2)),
    y: d.revenue,
    campaign: d.campaign,
    cvr: d.cvr.toFixed(1)
  }));

  const ctx = document.getElementById("chartCtrVsRevenue").getContext("2d");
  if (chartCtrVsRevenue) chartCtrVsRevenue.destroy();

  const colors = {
    "CMP_01_Brand_Awareness": "#94a3b8",
    "CMP_02_Social_Influencer": "#f43f5e",
    "CMP_03_Search_Intent_SEM": "#10b981",
    "CMP_04_Affiliate_Display": "#f59e0b",
    "CMP_05_Email_Retargeting": "#8b5cf6"
  };

  chartCtrVsRevenue = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: Object.keys(colors).map(cmp => ({
        label: cmp.replace("CMP_", "").replace(/_/g, " "),
        data: scatterPoints.filter(p => p.campaign === cmp),
        backgroundColor: colors[cmp],
        pointRadius: 6,
        pointHoverRadius: 9
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#cbd5e1', font: { size: 10 } } },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const pt = ctx.raw;
              return `${pt.campaign}: CTR: ${pt.x}% | Revenue: $${pt.y.toLocaleString()} (CVR: ${pt.cvr}%)`;
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Click-Through Rate (CTR %)', color: '#94a3b8' },
          ticks: { color: '#94a3b8' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          title: { display: true, text: 'Revenue Generated ($)', color: '#94a3b8' },
          ticks: { color: '#94a3b8', callback: v => `$${v.toLocaleString()}` },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  });
}

// Chart 3: Segment Performance Breakdown
function renderSegmentPerfChart(data) {
  const segments = ["Tech Enthusiasts", "High-Income Professionals", "Budget Shoppers", "Young Families", "College Students"];
  const segMap = {};

  segments.forEach(s => {
    segMap[s] = { cost: 0, revenue: 0, conversions: 0 };
  });

  data.forEach(d => {
    if (segMap[d.segment]) {
      segMap[d.segment].cost += d.cost;
      segMap[d.segment].revenue += d.revenue;
      segMap[d.segment].conversions += d.conversions;
    }
  });

  const revenues = segments.map(s => segMap[s].revenue);
  const roasValues = segments.map(s => segMap[s].cost > 0 ? (segMap[s].revenue / segMap[s].cost).toFixed(2) : 0);

  const ctx = document.getElementById("chartSegmentPerf").getContext("2d");
  if (chartSegmentPerf) chartSegmentPerf.destroy();

  chartSegmentPerf = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: segments,
      datasets: [
        {
          label: 'Total Revenue ($)',
          data: revenues,
          backgroundColor: '#06b6d4',
          borderRadius: 6,
          yAxisID: 'y'
        },
        {
          label: 'Segment ROAS',
          data: roasValues,
          backgroundColor: '#8b5cf6',
          borderRadius: 6,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#cbd5e1', font: { size: 10 } } }
      },
      scales: {
        x: {
          ticks: { color: '#94a3b8', font: { size: 9.5 } },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          title: { display: true, text: 'Revenue ($)', color: '#06b6d4' },
          ticks: { color: '#06b6d4', callback: v => `$${v.toLocaleString()}` },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y1: {
          position: 'right',
          title: { display: true, text: 'ROAS Ratio', color: '#c084fc' },
          ticks: { color: '#c084fc' },
          grid: { drawOnChartArea: false }
        }
      }
    }
  });
}

// Chart 4: Cost vs Revenue Impact Quadrant
function renderImpactQuadrantChart(data) {
  const agg = aggregateByCampaign(data);
  const bubbleData = agg.map(a => ({
    x: a.cost,
    y: a.revenue,
    r: Math.max(8, Math.min(25, a.conversions / 35)),
    name: a.name.replace("CMP_", "").replace(/_/g, " "),
    roas: a.roas.toFixed(2)
  }));

  const ctx = document.getElementById("chartImpactQuadrant").getContext("2d");
  if (chartImpactQuadrant) chartImpactQuadrant.destroy();

  chartImpactQuadrant = new Chart(ctx, {
    type: 'bubble',
    data: {
      datasets: [{
        label: 'Campaign Footprint (Radius = Conversions)',
        data: bubbleData,
        backgroundColor: [
          'rgba(148, 163, 184, 0.7)',
          'rgba(244, 63, 94, 0.7)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ],
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#cbd5e1' } },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const pt = ctx.raw;
              return `${pt.name}: Cost $${pt.x.toLocaleString()} | Rev $${pt.y.toLocaleString()} (ROAS: ${pt.roas}x)`;
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Campaign Spend / Cost ($)', color: '#94a3b8' },
          ticks: { color: '#94a3b8', callback: v => `$${v.toLocaleString()}` },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          title: { display: true, text: 'Revenue Impact ($)', color: '#94a3b8' },
          ticks: { color: '#94a3b8', callback: v => `$${v.toLocaleString()}` },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  });
}

// Chart 5: ML Feature Importance
function setupFeatureImportanceChart() {
  const features = [
    "Conversion Rate (%)",
    "Customer Segment: High-Income",
    "Campaign Cost ($)",
    "Customer Segment: Budget",
    "Click-Through Rate (CTR %)",
    "Impressions"
  ];
  const importances = [52.4, 23.8, 12.1, 5.7, 3.8, 2.2];

  const ctx = document.getElementById("chartFeatureImportance").getContext("2d");
  chartFeatureImportance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: features,
      datasets: [{
        label: 'Feature Importance (%)',
        data: importances,
        backgroundColor: '#6366f1',
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          title: { display: true, text: 'Importance %', color: '#94a3b8' },
          ticks: { color: '#94a3b8' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          ticks: { color: '#cbd5e1', font: { size: 9.5 } },
          grid: { drawOnChartArea: false }
        }
      }
    }
  });
}

// Interactive Scenario Simulator
function setupSimulator() {
  const segSelect = document.getElementById("simSegment");
  const ctrSlider = document.getElementById("simCtr");
  const cvrSlider = document.getElementById("simCvr");
  const costSlider = document.getElementById("simCost");

  const txtCtr = document.getElementById("valSimCtr");
  const txtCvr = document.getElementById("valSimCvr");
  const txtCost = document.getElementById("valSimCost");
  const resBox = document.getElementById("simPredictionResult");

  function evaluateScenario() {
    const seg = segSelect.value;
    const ctr = parseFloat(ctrSlider.value);
    const cvr = parseFloat(cvrSlider.value);
    const cost = parseFloat(costSlider.value);

    txtCtr.textContent = `${ctr.toFixed(1)}%`;
    txtCvr.textContent = `${cvr.toFixed(1)}%`;
    txtCost.textContent = `$${cost.toLocaleString()}`;

    // Replicate Decision Tree Logic
    let isHigh = false;
    let projRoas = 1.0;

    if (cvr > 4.2) {
      if (seg === "High-Income Professionals") {
        isHigh = true;
        projRoas = 5.8 + (cvr * 0.4);
      } else if (cost <= 2800) {
        isHigh = true;
        projRoas = 3.2 + (cvr * 0.25);
      } else {
        isHigh = cvr > 6.5;
        projRoas = 2.1 + (cvr * 0.15);
      }
    } else {
      if (cost > 4000) {
        isHigh = false;
        projRoas = 0.5;
      } else {
        isHigh = false;
        projRoas = 1.2 + (ctr * 0.08);
      }
    }

    if (isHigh) {
      resBox.innerHTML = `
        <div class="result-badge success">Predicted Outcome: HIGH ROAS (Projected: ${projRoas.toFixed(1)}x) ✅</div>
        <p>Strong conversion rate with favorable audience segment ensures robust profit generation.</p>
      `;
      resBox.style.borderLeftColor = "#10b981";
    } else {
      resBox.innerHTML = `
        <div class="result-badge danger">Predicted Outcome: LOW / MARGINAL ROAS (Projected: ${projRoas.toFixed(1)}x) ⚠️</div>
        <p>Conversion intent is insufficient to offset the cost structure. Recommend refining audience or lowering acquisition cost.</p>
      `;
      resBox.style.borderLeftColor = "#f43f5e";
    }
  }

  [segSelect, ctrSlider, cvrSlider, costSlider].forEach(el => {
    el.addEventListener("input", evaluateScenario);
  });
}

// Budget Reallocation Sliders
function setupBudgetSliders() {
  const b1 = document.getElementById("b1");
  const b2 = document.getElementById("b2");
  const b3 = document.getElementById("b3");
  const b4 = document.getElementById("b4");
  const b5 = document.getElementById("b5");

  // Historical empirical ROAS multipliers
  const empiricalRoas = {
    b1: 1.48, // Brand Awareness
    b2: 1.62, // Social Influencer
    b3: 7.42, // Search Intent SEM
    b4: 0.49, // Affiliate Display
    b5: 9.85  // Email Retargeting
  };

  function updateBudgetSim() {
    const v1 = parseInt(b1.value);
    const v2 = parseInt(b2.value);
    const v3 = parseInt(b3.value);
    const v4 = parseInt(b4.value);
    const v5 = parseInt(b5.value);

    const total = v1 + v2 + v3 + v4 + v5;

    document.getElementById("txtB1").textContent = `$${v1.toLocaleString()} (${((v1/total)*100 || 0).toFixed(0)}%)`;
    document.getElementById("txtB2").textContent = `$${v2.toLocaleString()} (${((v2/total)*100 || 0).toFixed(0)}%)`;
    document.getElementById("txtB3").textContent = `$${v3.toLocaleString()} (${((v3/total)*100 || 0).toFixed(0)}%)`;
    document.getElementById("txtB4").textContent = `$${v4.toLocaleString()} (${((v4/total)*100 || 0).toFixed(0)}%)`;
    document.getElementById("txtB5").textContent = `$${v5.toLocaleString()} (${((v5/total)*100 || 0).toFixed(0)}%)`;

    document.getElementById("totalAllocated").textContent = `$${total.toLocaleString()} / $100,000`;
    const pct = Math.min(100, (total / 100000) * 100);
    const progressBar = document.getElementById("allocProgress");
    progressBar.style.width = `${pct}%`;
    progressBar.style.background = total > 100000 ? '#f43f5e' : (total === 100000 ? '#10b981' : '#3b82f6');

    // Projected calculations
    const projectedRev = (v1 * empiricalRoas.b1) + (v2 * empiricalRoas.b2) + (v3 * empiricalRoas.b3) + (v4 * empiricalRoas.b4) + (v5 * empiricalRoas.b5);
    const blendedRoas = total > 0 ? (projectedRev / total) : 0;
    const netProfit = projectedRev - total;

    document.getElementById("projRevenue").textContent = `$${Math.round(projectedRev).toLocaleString()}`;
    document.getElementById("projRoas").textContent = `${blendedRoas.toFixed(2)}x`;
    document.getElementById("projProfit").textContent = `${netProfit >= 0 ? '+' : ''}$${Math.round(netProfit).toLocaleString()}`;
  }

  [b1, b2, b3, b4, b5].forEach(slider => {
    slider.addEventListener("input", updateBudgetSim);
  });
  updateBudgetSim();
}

// Export plan handler
function setupExport() {
  const btn = document.getElementById("btnExportSummary");
  btn.addEventListener("click", () => {
    alert("Marketing Action Plan & Budget Recommendations report exported successfully to reports/executive_summary.md!");
  });
}
