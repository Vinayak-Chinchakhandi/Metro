import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import joblib

# project root
BASE_DIR = Path(__file__).resolve().parents[3]

dataset_path = BASE_DIR / "datasets" / "processed" / "fraud_dataset.csv"
model_path = BASE_DIR / "ai-service" / "app" / "models" / "fraud_model.pkl"

# load dataset
df = pd.read_csv(dataset_path)

print("Dataset loaded:", df.shape)

# remove ticket id
df = df.drop(columns=["ticket_id"])

# encode categorical columns
encoders = {}

for column in ["entry_station", "exit_station", "ticket_type"]:
    le = LabelEncoder()
    df[column] = le.fit_transform(df[column])
    encoders[column] = le

# features
X = df.drop(columns=["fraud_label"])

# target
y = df["fraud_label"]

# train test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("Training rows:", len(X_train))
print("Testing rows:", len(X_test))

# model
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=12,
    random_state=42
)

# train
model.fit(X_train, y_train)

# predictions
preds = model.predict(X_test)

# evaluation
accuracy = accuracy_score(y_test, preds)

print("Model Accuracy:", accuracy)

print("\nClassification Report:")
print(classification_report(y_test, preds))

# save model
model_path.parent.mkdir(parents=True, exist_ok=True)

joblib.dump(model, model_path)

print("Model saved to:", model_path)