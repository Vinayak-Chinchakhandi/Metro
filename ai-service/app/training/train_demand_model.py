import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error
import joblib

# project root
BASE_DIR = Path(__file__).resolve().parents[3]

dataset_path = BASE_DIR / "datasets" / "processed" / "demand_dataset.csv"
model_path = BASE_DIR / "ai-service" / "app" / "models" / "demand_model.pkl"

# load dataset
df = pd.read_csv(dataset_path)

print("Dataset loaded:", df.shape)

# encode categorical features
encoders = {}

for column in ["station", "day", "weather"]:
    le = LabelEncoder()
    df[column] = le.fit_transform(df[column])
    encoders[column] = le

# features and target
X = df[["station", "hour", "day", "weather", "event"]]
y = df["passenger_count"]

# split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("Training rows:", len(X_train))
print("Testing rows:", len(X_test))

# model
model = RandomForestRegressor(
    n_estimators=150,
    max_depth=12,
    random_state=42
)

# train
model.fit(X_train, y_train)

# predictions
preds = model.predict(X_test)

# evaluation
mae = mean_absolute_error(y_test, preds)

print("Mean Absolute Error:", mae)

# save model
model_path.parent.mkdir(parents=True, exist_ok=True)
joblib.dump(model, model_path)

print("Model saved to:", model_path)