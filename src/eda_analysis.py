"""
Exploratory Data Analysis (EDA) & Visualization Module for DS_Day01_37.
Performs descriptive statistics, correlation analysis, campaign/segment comparisons,
investigates CTR vs Revenue, identifies underperforming campaigns, and saves 4 visual plots.
"""

import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

def set_plot_style():
    sns.set_theme(style="whitegrid", palette="muted")
    plt.rcParams.update({
        "font.family": "sans-serif",
        "font.sans-serif": ["Segoe UI", "DejaVu Sans", "Helvetica", "Arial"],
        "figure.autolayout": True,
        "figure.titlesize": 14,
        "axes.titlesize": 13,
        "axes.labelsize": 11,
        "xtick.labelsize": 10,
        "ytick.labelsize": 10,
        "legend.fontsize": 10
    })

def generate_descriptive_stats(df: pd.DataFrame) -> pd.DataFrame:
    metrics = ["Campaign_Cost", "Impressions", "Clicks", "Conversions", "Revenue", "CTR_%", "Conversion_Rate_%", "CPA", "ROAS", "Net_Profit"]
    stats_df = df[metrics].describe().T[["count", "mean", "std", "min", "25%", "50%", "75%", "max"]]
    stats_df = stats_df.round(2)
    return stats_df

def analyze_campaign_performance(df: pd.DataFrame) -> pd.DataFrame:
    cmp_summary = df.groupby("Campaign_ID").agg(
        Total_Cost=("Campaign_Cost", "sum"),
        Total_Impressions=("Impressions", "sum"),
        Total_Clicks=("Clicks", "sum"),
        Total_Conversions=("Conversions", "sum"),
        Total_Revenue=("Revenue", "sum"),
        Avg_CTR=("CTR_%", "mean"),
        Avg_CVR=("Conversion_Rate_%", "mean"),
        Avg_CPA=("CPA", "mean"),
        Avg_ROAS=("ROAS", "mean"),
        Net_Profit=("Net_Profit", "sum")
    ).reset_index()
    
    cmp_summary["Overall_ROAS"] = (cmp_summary["Total_Revenue"] / cmp_summary["Total_Cost"]).round(2)
    cmp_summary["Overall_CPA"] = (cmp_summary["Total_Cost"] / cmp_summary["Total_Conversions"]).round(2)
    return cmp_summary.sort_values(by="Overall_ROAS", ascending=False)

def analyze_segment_performance(df: pd.DataFrame) -> pd.DataFrame:
    seg_summary = df.groupby("Customer_Segment").agg(
        Total_Cost=("Campaign_Cost", "sum"),
        Total_Clicks=("Clicks", "sum"),
        Total_Conversions=("Conversions", "sum"),
        Total_Revenue=("Revenue", "sum"),
        Avg_CTR=("CTR_%", "mean"),
        Avg_CVR=("Conversion_Rate_%", "mean"),
        Avg_ROAS=("ROAS", "mean")
    ).reset_index()
    seg_summary["Overall_ROAS"] = (seg_summary["Total_Revenue"] / seg_summary["Total_Cost"]).round(2)
    return seg_summary.sort_values(by="Overall_ROAS", ascending=False)

def create_visualizations(df: pd.DataFrame, output_dir: str):
    os.makedirs(output_dir, exist_ok=True)
    set_plot_style()
    
    # -------------------------------------------------------------
    # Visualization 1: Campaign Performance Comparison (ROAS & CPA)
    # -------------------------------------------------------------
    cmp_metrics = df.groupby("Campaign_ID").agg({"ROAS": "mean", "CPA": "mean"}).reset_index()
    
    fig, ax1 = plt.subplots(figsize=(10, 5.5))
    x = np.arange(len(cmp_metrics))
    width = 0.35
    
    rects1 = ax1.bar(x - width/2, cmp_metrics["ROAS"], width, label="Avg ROAS (Revenue / Cost)", color="#2563eb", alpha=0.9)
    ax1.set_ylabel("ROAS Ratio", color="#1e40af", fontweight="bold")
    ax1.set_title("Visualization 1: Campaign Comparison — Return on Ad Spend (ROAS) vs. Cost Per Acquisition (CPA)", fontweight="bold", pad=15)
    ax1.set_xticks(x)
    ax1.set_xticklabels([c.replace("_", " ") for c in cmp_metrics["Campaign_ID"]], rotation=15, ha="right")
    ax1.grid(axis="y", linestyle="--", alpha=0.5)
    
    # Add target line for break-even ROAS = 1.0
    ax1.axhline(1.0, color="#dc2626", linestyle=":", linewidth=1.5, label="Break-Even (ROAS = 1.0)")
    
    ax2 = ax1.twinx()
    rects2 = ax2.bar(x + width/2, cmp_metrics["CPA"], width, label="Avg CPA ($ Cost per Conversion)", color="#f59e0b", alpha=0.85)
    ax2.set_ylabel("CPA ($)", color="#b45309", fontweight="bold")
    ax2.grid(False)
    
    # Value labels on bars
    for rect in rects1:
        h = rect.get_height()
        ax1.annotate(f"{h:.1f}x", xy=(rect.get_x() + rect.get_width() / 2, h),
                     xytext=(0, 3), textcoords="offset points", ha="center", va="bottom", fontsize=9, fontweight="bold")
    for rect in rects2:
        h = rect.get_height()
        ax2.annotate(f"${h:.0f}", xy=(rect.get_x() + rect.get_width() / 2, h),
                     xytext=(0, 3), textcoords="offset points", ha="center", va="bottom", fontsize=9)
        
    lines1, labels1 = ax1.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    ax1.legend(lines1 + lines2, labels1 + labels2, loc="upper right", frameon=True)
    
    v1_path = os.path.join(output_dir, "viz1_campaign_kpi_comparison.png")
    plt.savefig(v1_path, dpi=300, bbox_inches="tight")
    plt.close()
    
    # -------------------------------------------------------------
    # Visualization 2: High CTR vs Revenue Investigation
    # -------------------------------------------------------------
    fig, ax = plt.subplots(figsize=(10, 6))
    palette = sns.color_palette("deep", len(df["Campaign_ID"].unique()))
    
    sns.scatterplot(
        data=df,
        x="CTR_%",
        y="Revenue",
        hue="Campaign_ID",
        size="Conversions",
        sizes=(40, 250),
        alpha=0.85,
        ax=ax,
        palette=palette
    )
    
    # Add trendline across all campaigns
    sns.regplot(
        data=df,
        x="CTR_%",
        y="Revenue",
        scatter=False,
        ax=ax,
        color="#64748b",
        line_kws={"linestyle": "--", "linewidth": 1.5, "label": "Overall Trendline (R² is weak)"}
    )
    
    ax.set_title("Visualization 2: Does High CTR Mean High Revenue? (CTR vs. Revenue Investigation)", fontweight="bold", pad=15)
    ax.set_xlabel("Click-Through Rate (CTR %)", fontweight="bold")
    ax.set_ylabel("Revenue Generated ($)", fontweight="bold")
    
    # Annotate critical takeaway
    ax.annotate(
        "Insight: Social Influencer has highest CTR (~6%)\nbut generates low Revenue due to poor conversion intent!",
        xy=(5.8, 14000), xytext=(3.5, 32000),
        arrowprops=dict(facecolor="#dc2626", shrink=0.05, width=1.5, headwidth=8),
        bbox=dict(boxstyle="round,pad=0.5", fc="#fee2e2", ec="#ef4444", lw=1.2),
        fontsize=9, fontweight="bold", color="#991b1b"
    )
    
    ax.legend(bbox_to_anchor=(1.02, 1), loc="upper left", borderaxespad=0.)
    v2_path = os.path.join(output_dir, "viz2_ctr_vs_revenue_investigation.png")
    plt.savefig(v2_path, dpi=300, bbox_inches="tight")
    plt.close()
    
    # -------------------------------------------------------------
    # Visualization 3: Performance Across Customer Segments Heatmap
    # -------------------------------------------------------------
    pivot_roas = df.pivot_table(index="Campaign_ID", columns="Customer_Segment", values="ROAS", aggfunc="mean")
    
    fig, ax = plt.subplots(figsize=(10, 5.5))
    sns.heatmap(pivot_roas, annot=True, fmt=".2f", cmap="YlGnBu", cbar_kws={'label': 'Average ROAS'}, linewidths=1, ax=ax)
    ax.set_title("Visualization 3: Segment Performance Matrix (Average ROAS by Campaign & Segment)", fontweight="bold", pad=15)
    ax.set_xlabel("Customer Segment", fontweight="bold")
    ax.set_ylabel("Campaign ID", fontweight="bold")
    ax.set_yticklabels([t.get_text().replace("_", " ") for t in ax.get_yticklabels()], rotation=0)
    
    v3_path = os.path.join(output_dir, "viz3_segment_performance_heatmap.png")
    plt.savefig(v3_path, dpi=300, bbox_inches="tight")
    plt.close()
    
    # -------------------------------------------------------------
    # Visualization 4: High Cost vs Low Business Impact Quadrant
    # -------------------------------------------------------------
    fig, ax = plt.subplots(figsize=(10, 6))
    
    cost_med = df["Campaign_Cost"].median()
    rev_med = df["Revenue"].median()
    
    sns.scatterplot(
        data=df,
        x="Campaign_Cost",
        y="Revenue",
        hue="Campaign_ID",
        size="ROAS",
        sizes=(50, 300),
        alpha=0.85,
        ax=ax,
        palette="tab10"
    )
    
    ax.axvline(cost_med, color="#94a3b8", linestyle=":", label=f"Median Cost (${cost_med:,.0f})")
    ax.axhline(rev_med, color="#94a3b8", linestyle=":", label=f"Median Revenue (${rev_med:,.0f})")
    
    # Quadrant annotations
    ax.text(df["Campaign_Cost"].max() * 0.98, df["Revenue"].max() * 0.95, "HIGH COST / HIGH REVENUE",
            ha="right", va="top", fontsize=9, color="#15803d", fontweight="bold", alpha=0.7)
    ax.text(df["Campaign_Cost"].min() * 1.05, df["Revenue"].max() * 0.95, "HIGH ROI EFFICIENCY\n(Low Cost / High Revenue)",
            ha="left", va="top", fontsize=9, color="#0369a1", fontweight="bold", alpha=0.7)
    ax.text(df["Campaign_Cost"].max() * 0.98, df["Revenue"].min() * 1.05, "CRITICAL CONCERN:\nHIGH COST / LOW IMPACT",
            ha="right", va="bottom", fontsize=9, color="#b91c1c", fontweight="bold", alpha=0.8)
    
    ax.set_title("Visualization 4: Campaign Cost vs. Revenue Impact Quadrant Analysis", fontweight="bold", pad=15)
    ax.set_xlabel("Campaign Cost ($)", fontweight="bold")
    ax.set_ylabel("Revenue Generated ($)", fontweight="bold")
    ax.legend(bbox_to_anchor=(1.02, 1), loc="upper left", borderaxespad=0.)
    
    v4_path = os.path.join(output_dir, "viz4_cost_vs_revenue_impact.png")
    plt.savefig(v4_path, dpi=300, bbox_inches="tight")
    plt.close()
    
    print(f"Generated 4 visualizations saved to {output_dir}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(__file__))
    data_path = os.path.join(base_dir, "data", "processed_campaign_data.csv")
    out_viz = os.path.join(base_dir, "visualizations")
    
    if os.path.exists(data_path):
        df = pd.read_csv(data_path)
        print("--- Descriptive Statistics ---")
        print(generate_descriptive_stats(df))
        print("\n--- Campaign Summary ---")
        print(analyze_campaign_performance(df))
        print("\n--- Generating Visualizations ---")
        create_visualizations(df, out_viz)
    else:
        print(f"File {data_path} not found. Please run data_processor.py first.")
