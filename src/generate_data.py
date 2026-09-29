"""
Data generation module for DS_Day01_37: Digital Marketing Campaign Analysis.
Generates realistic multi-campaign marketing dataset with varied customer segments,
incorporating real-world marketing dynamics (CTR vs Revenue divergence, high-cost underperformers).
"""

import numpy as np
import pandas as pd
import os

def generate_marketing_dataset(num_records: int = 1200, random_seed: int = 42) -> pd.DataFrame:
    np.random.seed(random_seed)
    
    campaigns = [
        "CMP_01_Brand_Awareness",      # High impressions, moderate CTR, lower conversion rate, lower ROAS
        "CMP_02_Social_Influencer",     # High CTR (click-friendly), but lower intent & low average order revenue
        "CMP_03_Search_Intent_SEM",     # Moderate CTR, high conversion rate, excellent ROAS
        "CMP_04_Affiliate_Display",     # High cost, moderate impressions, poor conversions (Low impact)
        "CMP_05_Email_Retargeting"      # Focused impressions, high conversion, low cost, highest ROAS
    ]
    
    segments = [
        "Tech Enthusiasts",
        "High-Income Professionals",
        "Budget Shoppers",
        "Young Families",
        "College Students"
    ]
    
    data = []
    
    for _ in range(num_records):
        cmp = np.random.choice(campaigns, p=[0.22, 0.24, 0.20, 0.18, 0.16])
        seg = np.random.choice(segments, p=[0.25, 0.20, 0.25, 0.15, 0.15])
        
        # Segment baseline modifiers
        seg_cvr_mod = {
            "Tech Enthusiasts": 1.15,
            "High-Income Professionals": 1.45,
            "Budget Shoppers": 0.85,
            "Young Families": 1.05,
            "College Students": 0.70
        }[seg]
        
        seg_rev_per_conv = {
            "Tech Enthusiasts": 110.0,
            "High-Income Professionals": 220.0,
            "Budget Shoppers": 48.0,
            "Young Families": 95.0,
            "College Students": 35.0
        }[seg]
        
        # Campaign characteristics
        if cmp == "CMP_01_Brand_Awareness":
            cost = np.random.uniform(1500, 3800)
            impressions = int(np.random.uniform(45000, 95000))
            ctr = np.random.uniform(0.012, 0.024)
            clicks = max(10, int(impressions * ctr))
            base_cvr = np.random.uniform(0.015, 0.035) * seg_cvr_mod
            conversions = max(1, int(clicks * base_cvr))
            revenue = round(conversions * seg_rev_per_conv * np.random.uniform(0.85, 1.25), 2)
            
        elif cmp == "CMP_02_Social_Influencer":
            cost = np.random.uniform(2200, 4800)
            impressions = int(np.random.uniform(50000, 110000))
            # Noticeably high CTR!
            ctr = np.random.uniform(0.045, 0.075)
            clicks = max(20, int(impressions * ctr))
            # Lower conversion intent despite high clicks
            base_cvr = np.random.uniform(0.010, 0.022) * seg_cvr_mod
            conversions = max(1, int(clicks * base_cvr))
            revenue = round(conversions * seg_rev_per_conv * np.random.uniform(0.70, 1.05), 2)
            
        elif cmp == "CMP_03_Search_Intent_SEM":
            cost = np.random.uniform(1200, 3200)
            impressions = int(np.random.uniform(20000, 50000))
            ctr = np.random.uniform(0.028, 0.048)
            clicks = max(15, int(impressions * ctr))
            # High intent conversions
            base_cvr = np.random.uniform(0.055, 0.095) * seg_cvr_mod
            conversions = max(2, int(clicks * base_cvr))
            revenue = round(conversions * seg_rev_per_conv * np.random.uniform(1.05, 1.40), 2)
            
        elif cmp == "CMP_04_Affiliate_Display":
            # High cost, low business return
            cost = np.random.uniform(3200, 6200)
            impressions = int(np.random.uniform(35000, 75000))
            ctr = np.random.uniform(0.015, 0.030)
            clicks = max(10, int(impressions * ctr))
            # Low conversion rate
            base_cvr = np.random.uniform(0.008, 0.020) * seg_cvr_mod
            conversions = max(1, int(clicks * base_cvr))
            revenue = round(conversions * seg_rev_per_conv * np.random.uniform(0.60, 0.95), 2)
            
        else: # CMP_05_Email_Retargeting
            cost = np.random.uniform(600, 1600)
            impressions = int(np.random.uniform(12000, 32000))
            ctr = np.random.uniform(0.032, 0.058)
            clicks = max(12, int(impressions * ctr))
            # High conversion rate from warm leads
            base_cvr = np.random.uniform(0.065, 0.110) * seg_cvr_mod
            conversions = max(3, int(clicks * base_cvr))
            revenue = round(conversions * seg_rev_per_conv * np.random.uniform(1.10, 1.45), 2)
            
        data.append({
            "Campaign_ID": cmp,
            "Customer_Segment": seg,
            "Campaign_Cost": round(cost, 2),
            "Impressions": impressions,
            "Clicks": clicks,
            "Conversions": conversions,
            "Revenue": revenue
        })
        
    df = pd.DataFrame(data)
    
    # Introduce a small percentage of realistic raw data quirks for the cleaning step
    # (e.g., slight noise or 5-10 zero/null values to validate and clean)
    dirty_indices = np.random.choice(df.index, size=15, replace=False)
    for idx in dirty_indices[:5]:
        df.loc[idx, "Campaign_Cost"] = np.nan
    for idx in dirty_indices[5:10]:
        df.loc[idx, "Revenue"] = -50.0  # Invalid negative anomaly
    for idx in dirty_indices[10:]:
        df.loc[idx, "Clicks"] = 0  # Zero clicks edge case
        
    return df

if __name__ == "__main__":
    out_dir = os.path.join(os.path.dirname(__file__), "..", "data")
    os.makedirs(out_dir, exist_ok=True)
    raw_path = os.path.join(out_dir, "raw_campaign_data.csv")
    
    df = generate_marketing_dataset()
    df.to_csv(raw_path, index=False)
    print(f"Generated {len(df)} records saved to {raw_path}")
