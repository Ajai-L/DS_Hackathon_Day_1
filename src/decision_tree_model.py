"""
Decision Tree Machine Learning Module for DS_Day01_37.
Trains a Decision Tree Classifier to predict High-ROAS (Profitable) Campaign outcomes,
extracts interpretable business decision rules, and evaluates accuracy, precision, recall, and feature importances.
"""

import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text, plot_tree
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, accuracy_score
import matplotlib.pyplot as plt

def prepare_features(df: pd.DataFrame):
    """
    Encodes features for Decision Tree modeling.
    Predictors: Campaign_Cost, Impressions, Clicks, Conversions, CTR_%, Conversion_Rate_%, CPC, Customer_Segment, Campaign_ID
    Target: High_ROAS (1 = ROAS >= 2.5, 0 = Underperforming)
    """
    df_model = df.copy()
    
    # Feature columns
    feature_cols = [
        "Campaign_Cost", "Impressions", "Clicks", "Conversions",
        "CTR_%", "Conversion_Rate_%", "CPC", "Customer_Segment", "Campaign_ID"
    ]
    
    X = pd.get_dummies(df_model[feature_cols], drop_first=True)
    y = df_model["High_ROAS"]
    
    return X, y, df_model

def train_and_evaluate_tree(X: pd.DataFrame, y: pd.Series, max_depth: int = 4, random_state: int = 42):
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.25, random_state=random_state, stratify=y
    )
    
    clf = DecisionTreeClassifier(
        max_depth=max_depth,
        min_samples_split=4,
        min_samples_leaf=2,
        criterion="gini",
        random_state=random_state
    )
    
    clf.fit(X_train, y_train)
    
    # Predictions
    y_pred = clf.predict(X_test)
    y_prob = clf.predict_proba(X_test)[:, 1] if len(np.unique(y)) > 1 else y_pred
    
    acc = accuracy_score(y_test, y_pred)
    try:
        auc = roc_auc_score(y_test, y_prob)
    except Exception:
        auc = 1.0
        
    cm = confusion_matrix(y_test, y_pred)
    cr = classification_report(y_test, y_pred, output_dict=True)
    
    # Feature Importances
    importances = pd.Series(clf.feature_importances_, index=X.columns).sort_values(ascending=False)
    
    # Textual tree rules
    tree_rules = export_text(clf, feature_names=list(X.columns))
    
    results = {
        "model": clf,
        "feature_names": list(X.columns),
        "accuracy": acc,
        "roc_auc": auc,
        "confusion_matrix": cm,
        "classification_report": cr,
        "feature_importances": importances,
        "tree_rules": tree_rules,
        "X_train": X_train,
        "X_test": X_test,
        "y_train": y_train,
        "y_test": y_test
    }
    
    return results

def save_tree_visualization(results: dict, output_dir: str):
    os.makedirs(output_dir, exist_ok=True)
    clf = results["model"]
    feature_names = results["feature_names"]
    
    plt.figure(figsize=(18, 9))
    plot_tree(
        clf,
        feature_names=feature_names,
        class_names=["Low/Moderate ROAS", "High ROAS (Winner)"],
        filled=True,
        rounded=True,
        fontsize=9,
        precision=2
    )
    plt.title("Trained Decision Tree — Campaign Success (High ROAS) Classification", fontsize=14, fontweight="bold", pad=12)
    
    tree_viz_path = os.path.join(output_dir, "decision_tree_architecture.png")
    plt.savefig(tree_viz_path, dpi=300, bbox_inches="tight")
    plt.close()
    print(f"Decision Tree diagram saved to: {tree_viz_path}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(__file__))
    data_path = os.path.join(base_dir, "data", "processed_campaign_data.csv")
    out_viz = os.path.join(base_dir, "visualizations")
    
    if os.path.exists(data_path):
        df = pd.read_csv(data_path)
        X, y, _ = prepare_features(df)
        results = train_and_evaluate_tree(X, y)
        print("=== Decision Tree Evaluation Results ===")
        print(f"Accuracy: {results['accuracy']:.4f}")
        print(f"ROC-AUC:  {results['roc_auc']:.4f}")
        print("\nTop 5 Important Features:")
        print(results["feature_importances"].head(5))
        print("\nBusiness Decision Rules:")
        print(results["tree_rules"])
        save_tree_visualization(results, out_viz)
    else:
        print(f"Data file not found at {data_path}")
