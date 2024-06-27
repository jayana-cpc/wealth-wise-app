# app.py
from flask import Flask, request, jsonify

from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth
import os

app = Flask(__name__)
CORS(app)

# cred_path = os.path.join(os.path.dirname(__file__), 'secrets\creds.json')
cred = credentials.Certificate('secrets/creds.json')
firebase_admin.initialize_app(cred)

@app.route('/api/secure-data', methods=['GET'])
def secure_data():
    id_token = request.headers.get('Authorization').split('Bearer ')[1]
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        return jsonify({'message': 'Secure data', 'uid': uid}), 200
    except Exception as e:
        return jsonify({'message': 'Invalid token', 'error': str(e)}), 401

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
