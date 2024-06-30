import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase_admin import credentials, auth

import utils

app = Flask(__name__)
CORS(app)

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
