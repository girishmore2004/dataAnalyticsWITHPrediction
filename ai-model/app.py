# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LinearRegression
# from sklearn.tree import DecisionTreeRegressor
# from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
# from sklearn.svm import SVR
# from sklearn.neural_network import MLPRegressor
# from sklearn.metrics import r2_score
# import joblib
# import os

# app = Flask(__name__)

# # ✅ Allow specific frontend origin for CORS
# from flask_cors import CORS, cross_origin

# CORS(app)




# # File paths for saving/loading the model and metadata
# MODEL_FILE = "best_model.pkl"
# X_COLUMNS_FILE = "x_columns.pkl"
# TARGET_COLUMN_FILE = "target_column.pkl"

# # Global variables to store the model and metadata
# model = None
# X_columns = None
# prediction_target = None

# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({"message": "AI Model API is running 🚀"})




# @app.route("/predict", methods=["POST", "OPTIONS"])
# @cross_origin()

# def predict():
#     global model, X_columns, prediction_target

#     try:
#         # Get the request payload
#         data = request.json
#         print("Received payload:", data)  # Debugging: Log the incoming payload

#         # Validate the payload
#         required_keys = ["dataset", "selectedColumns", "targetColumn", "inputValues"]
#         if not all(key in data for key in required_keys):
#             return jsonify({"error": "Missing dataset, selected columns, target column, or input values"}), 400

#         dataset = data["dataset"]
#         selected_columns = data["selectedColumns"]
#         target_column = data["targetColumn"]
#         input_values = data["inputValues"]

#         # Convert dataset to DataFrame
#         df = pd.DataFrame(dataset["rows"], columns=dataset["columns"])

#         # Ensure selected columns exist in the dataset
#         if not all(col in df.columns for col in selected_columns):
#             return jsonify({"error": "Some selected columns are missing in the dataset"}), 400

#         # Set the target column
#         df = df[selected_columns]
#         prediction_target = target_column
#         if prediction_target not in df.columns:
#             return jsonify({"error": f"Target column '{prediction_target}' is not in the dataset"}), 400

#         X = df.drop(columns=[prediction_target])
#         y = df[prediction_target]

#         # Convert all data to numeric format
#         X = X.apply(pd.to_numeric, errors="coerce")
#         y = y.apply(pd.to_numeric, errors="coerce")

#         # Handle missing values
#         X.fillna(X.mean(), inplace=True)
#         y.fillna(y.mean(), inplace=True)

#         # Convert categorical variables to numerical
#         X = pd.get_dummies(X)

#         # Split the dataset into training and testing sets
#         X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

#         # Train multiple models and select the best one
#         models = {
#             "LinearRegression": LinearRegression(),
#             "DecisionTreeRegressor": DecisionTreeRegressor(random_state=42),
#             "RandomForestRegressor": RandomForestRegressor(random_state=42),
#             "GradientBoostingRegressor": GradientBoostingRegressor(random_state=42),
#             "SupportVectorRegressor": SVR(),
#             "NeuralNetworkRegressor": MLPRegressor(random_state=42, max_iter=1000),
#         }

#         best_model, best_r2_score, best_model_name = None, -float("inf"), ""

#         for model_name, model_instance in models.items():
#             try:
#                 # Train and evaluate the model
#                 model_instance.fit(X_train, y_train)
#                 y_pred = model_instance.predict(X_test)
#                 r2 = r2_score(y_test, y_pred)

#                 if r2 > best_r2_score:
#                     best_r2_score, best_model, best_model_name = r2, model_instance, model_name

#                 print(f"Model: {model_name}, R² score: {r2:.4f}")

#             except Exception as e:
#                 print(f"Error training {model_name}: {e}")

#         print(f"Best model: {best_model_name} with R² score: {best_r2_score:.4f}")

#         # Save the best model and metadata
#         model, X_columns = best_model, list(X.columns)
#         joblib.dump(model, MODEL_FILE)
#         joblib.dump(X_columns, X_COLUMNS_FILE)
#         joblib.dump(prediction_target, TARGET_COLUMN_FILE)

#         # Prepare input DataFrame for prediction
#         input_df = pd.DataFrame([input_values], columns=X_columns)
#         input_df = pd.get_dummies(input_df)

#         # Add missing columns
#         for col in set(X_columns) - set(input_df.columns):
#             input_df[col] = 0  
#         input_df = input_df[X_columns]  # Ensure column order

#         # Make the prediction
#         prediction = model.predict(input_df)[0]

#         return jsonify({
#             "prediction": round(float(prediction), 4),
#             "targetColumn": prediction_target,
#             "r2_score": round(best_r2_score, 4),
#             "best_model": best_model_name
#         })

#     except Exception as e:
#         print("Prediction error:", str(e))  # Debugging: Log the error
#         return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

# if __name__ == "__main__":
#     import os
#     app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5001)))

from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.svm import SVR
from sklearn.neural_network import MLPRegressor
from sklearn.metrics import r2_score
import joblib
import os

app = Flask(__name__)

# ✅ Proper CORS Configuration
# This sets up the default CORS handling
CORS(
    app,
    resources={r"/*": {"origins": "*"}},  # Allow all origins
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "OPTIONS"]
)

# ✅ Manually handle preflight 'OPTIONS' requests
# This is the most important part to fix the error
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

# File paths for saving/loading model
MODEL_FILE = "best_model.pkl"
X_COLUMNS_FILE = "x_columns.pkl"
TARGET_COLUMN_FILE = "target_column.pkl"

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "AI Model API is running 🚀"})

@app.route("/predict", methods=["POST"])  # No need for "OPTIONS" here anymore
def predict():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Invalid request body"}), 400

        dataset = data.get("dataset")
        selected_columns = data.get("selectedColumns")
        target_column = data.get("targetColumn")
        input_values = data.get("inputValues")

        if not dataset or not selected_columns or not target_column or not input_values:
            return jsonify({"error": "Missing required fields"}), 400

        df = pd.DataFrame(dataset["rows"], columns=dataset["columns"])
        df = df[selected_columns]

        if target_column not in df.columns:
            return jsonify({"error": f"Target column '{target_column}' not in dataset"}), 400

        X = df.drop(columns=[target_column])
        y = df[target_column]

        # Use fillna(0) for simplicity as in your example
        X = X.apply(pd.to_numeric, errors="coerce").fillna(0)
        y = y.apply(pd.to_numeric, errors="coerce").fillna(0)
        X = pd.get_dummies(X)

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        models = {
            "LinearRegression": LinearRegression(),
            "DecisionTree": DecisionTreeRegressor(random_state=42),
            "RandomForest": RandomForestRegressor(random_state=42),
            "GradientBoosting": GradientBoostingRegressor(random_state=42),
            "SVR": SVR(),
            "NeuralNetwork": MLPRegressor(random_state=42, max_iter=1000)
        }

        best_model = None
        best_score = -float("inf")
        best_name = ""

        for name, m in models.items():
            try:
                m.fit(X_train, y_train)
                score = r2_score(y_test, m.predict(X_test))
                if score > best_score:
                    best_model, best_score, best_name = m, score, name
            except Exception as e:
                print(f"{name} failed: {e}")
        
        # Ensure input_df has the same columns as the training data
        input_df = pd.DataFrame([input_values])
        input_df = input_df.apply(pd.to_numeric, errors="coerce").fillna(0)
        input_df = pd.get_dummies(input_df)
        # Reindex to match the columns from training
        input_df = input_df.reindex(columns=X.columns, fill_value=0)

        pred = best_model.predict(input_df)[0]

        return jsonify({
            "prediction": round(float(pred), 4),
            "r2_score": round(best_score, 4),
            "model": best_name,
            "targetColumn": target_column # Added this back from your original code
        })

    except Exception as e:
        print("Prediction error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5001)))
