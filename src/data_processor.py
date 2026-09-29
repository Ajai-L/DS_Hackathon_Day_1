"""
Data Processing & Validation Module for DS_Day01_37.
Cleans raw data, handles anomalies, and computes key marketing performance metrics.
"""

import pandas as pd
import numpy as np
import os

def clean_and_validate_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Cleans raw campaign data:
    - Drops or imputes missing values
    - Filters out negative or anomalous financial values
    - Validates relational logic: Clicks <= Impressions, Conversions <= Clicks
    """
    cleaned = df.copy()
    initial_count = len(cleaned)
    
    # 1. Drop rows with missing critical values
    cleaned = cleaned.dropna(subset=["Campaign_Cost", "Impressions", "Clicks", "Conversions", "Revenue"])
    
    # 2. Filter out negative values
    cleaned = cleaned[
        (cleaned["Campaign_Cost"] > 0) &
        (cleaned["Impressions"] > 0) &
        (cleaned["Clicks"] > 0) &
        (cleaned["Conversions"] >= 0) &
        (cleaned["Revenue"] >= 0)
    ]
    
    # 3. Relational validation
    cleaned = cleaned[cleaned["Clicks"] <= cleaned["Impressions"]]
    cleaned = cleaned[cleaned["Conversions"] <= cleaned["Clicks"]]
    
    print(f"Data Cleaning: Retained {len(cleaned)} of {initial_count} records ({initial_count - len(cleaned)} anomalies removed).")
    return cleaned

def compute_marketing_metrics(df: pd.DataFrame) -> pd.DataFrame:
    """
    Computes required digital marketing KPIs:
    - CTR (%): Click-Through Rate
    - Conversion_Rate (%): CVR
    - CPA ($): Cost Per Acquisition
    - ROAS: Return on Ad Spend (Revenue / Cost)
    - CPC ($): Cost Per Click
    - Net_Profit ($): Revenue - Cost
    - High_ROAS_Flag: Binary indicator (ROAS >= 2.5) for Decision Tree Classification
    """
    df = df.copy()
    
    # CTR (Click-Through Rate %)
    df["CTR_%"] = (df["Clicks"] / df["Impressions"]) * 100.0
    
    # Conversion Rate (%)
    df["Conversion_Rate_%"] = (df["Conversions"] / df["Clicks"]) * 100.0
    
    # CPA (Cost Per Acquisition)
    # If Conversions == 0, CPA is effectively infinite or set to NaN/Cost
    df["CPA"] = np.where(df["Conversions"] > 0, df["Campaign_Cost"] / df["Conversions"], np.nan)
    
    # ROAS (Return On Ad Spend)
    df["ROAS"] = df["Revenue"] / df["Campaign_Cost"]
    
    # Supplementary Business Metrics
    df["CPC"] = df["Campaign_Cost"] / df["Clicks"]
    df["Net_Profit"] = df["Revenue"] - df["Campaign_Cost"]
    df["Profit_Margin_%"] = np.where(df["Revenue"] > 0, (df["Net_Profit"] / df["Revenue"]) * 100.0, 0.0)
    
    # Target label for Decision Tree: High ROAS (ROAS >= 2.5 represents profitable campaign)
    df["High_ROAS"] = (df["ROAS"] >= 2.5).astype(int)
    
    # Round metrics for readability
    df["CTR_%"] = df["CTR_%"].round(3)
    df["Conversion_Rate_%"] = df["Conversion_Rate_%"].round(3)
    df["CPA"] = df["CPA"].round(2)
    df["ROAS"] = df["ROAS"].round(2)
    df["CPC"] = df["CPC"].round(2)
    df["Net_Profit"] = df["Net_Profit"].round(2)
    df["Profit_Margin_%"] = df["Profit_Margin_%"].round(2)
    
    return df

def run_pipeline(raw_csv_path: str, output_csv_path: str) -> pd.DataFrame:
    df_raw = pd.read_csv(raw_csv_path)
    df_clean = clean_and_validate_data(df_raw)
    df_processed = compute_marketing_metrics(df_clean)
    
    os.makedirs(os.path.dirname(output_csv_path), exist_ok=True)
    df_processed.to_csv(output_csv_path, index=False)
    print(f"Processed dataset saved successfully to: {output_csv_path}")
    return df_processed

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(__file__))
    raw_path = os.path.join(base_dir, "data", "raw_campaign_data.csv")
    out_path = os.path.join(base_dir, "data", "processed_campaign_data.csv")
    run_pipeline(raw_path, out_path)
