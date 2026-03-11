import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import joblib

BASE_DIR = Path(__file__).resolve().parents[3]

dataset_path = BASE_DIR / "datasets" / "processed" / "fraud_dataset.csv"
model_path = BASE_DIR / "ai-service" / "app" / "models" / "fraud_model.pkl"

df = pd.read_csv(dataset_path)

print("Dataset loaded:", df.shape)

df = df.drop(columns=["ticket_id"])

encoders = {}

for col in df.columns:
    if df[col].dtype == "object":
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        encoders[col] = le

X = df.drop(columns=["fraud_label"])
y = df["fraud_label"]

X = X.apply(pd.to_numeric)

X_train, X_test, y_train, y_test = train_test_split(
X,
y,
test_size=0.2,
random_state=42,
stratify=y
)

print("Training rows:", len(X_train))
print("Testing rows:", len(X_test))

model = RandomForestClassifier(
n_estimators=300,
max_depth=15,
random_state=42,
n_jobs=-1
)

model.fit(X_train, y_train)

preds = model.predict(X_test)

accuracy = accuracy_score(y_test, preds)

print("Model Accuracy:", accuracy)

print(classification_report(y_test, preds))

model_path.parent.mkdir(parents=True, exist_ok=True)

joblib.dump(model, model_path)

print("Model saved to:", model_path)