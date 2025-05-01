from flask import Flask, request, jsonify, render_template
from database.db import init_db
from services.ikigai import analyze_ikigai

app = Flask(__name__)
init_db(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        answers = request.json
        result = analyze_ikigai(answers)
        return jsonify({
            "status": "success",
            "result": result
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True) 