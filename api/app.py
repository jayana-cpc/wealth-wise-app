import os
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from firebase_admin import credentials, auth, db

import utils

from utils import User, init_curs, agg_vals, agg_vals_login, graphStock


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


# Pull ticker data from API and send to frontend
@app.route("/api/get-ticker-data", methods=['OPTIONS', 'GET'])
def get_data():
    init_curs()
    tickValue = request.args.get('ticker')
    newVal = graphStock(tickValue)
    data = newVal.to_dict(orient='records')
    return data


# Get Data from Database
@app.route("/api/get-login", methods=['OPTIONS', 'GET'])
def get_login():
    init_curs()
    ref = db.reference('/')
    data = ref.get()
    return data


# Create user and add to database
@app.route("/api/create-user", methods=['POST'])
def create_user():
    init_curs()
    data = request.json  # What the backend gives us
    email, pwd, fname, lname = agg_vals(data)  # get the email and password
    user = utils.User(email, pwd, fname, lname)  # Create a user object to handle things for us
    user.reg_user()  # Register user to database
    return "Successfully updated DB"


# LOGIN LEGACY!
@app.route("/api/login", methods=["POST"])
def login():
    init_curs()
    data = request.json
    email, pwd = agg_vals_login(data)  # get form values
    user = utils.User(email, pwd)  # create USER object
    stat, err = user.login_user(True)  # login
    user1 = {"email": user.email}
    secret_key = os.urandom(24)

    # Generate JWT token
    jwt_token = jwt.encode(user1, secret_key, algorithm='HS256')

    # Set HttpOnly cookie
    response = make_response("Logged in successfully")
    response.set_cookie("jwt_token", jwt_token, httponly=True)
    print(response.headers)

    if not stat:  # oh nah they monkey up
        if err == 401:
            return "Incorrect password"
        else:
            return "User does not exist"
    return "Login Successful"


# REGISTER WIT GOOGLE!
@app.route('/api/register-google', methods=["POST"])
def register_google():
    data = request.json  # the Google stuff
    user = utils.User(id=data.get('idToken'))
    res, stat = user.reg_user()
    if not res:  # error 
        if stat == 401:
            return "userext"
        else:
            return "interr"

    return "success"


# LOGIN WIT GOOGLE
@app.route("/api/login-google", methods=["POST"])
def login_google():
    data = request.json
    user = utils.User(id=data.get("idToken"))
    res, stat = user.login_user(False)  # False because not LEGACY, we goin wit GOOGLE
    if not res:  # HOOWOWWW
        if stat == 401:
            return "interr"
        else:
            return "notexist"
    return "success"


# Post new user portfolio to database
@app.route("/api/post-portfolio-info", methods=["POST"])
def post_user_info():
    isDeleted = False
    init_curs()
    data = request.json
    print(f"Request payload is: {data}")
    email, _, _, _ = agg_vals(data)  # Get the logged-in user's email from the frontend data
    user = User(email=email)  # Create a User object with the logged-in user's email (no need for pwd, fname, and lname)
    portfolio_data = data.get("parsedData")  # Get the user's stock portfolio data from the frontend data
    if portfolio_data is None:
        isDeleted = True
        portfolio_data = data.get("updatedStocks")
    print(f"User portfolio data is: {portfolio_data}")
    print(user.post_portfolio_info(portfolio_data, isDelete=isDeleted))  # Call the post_user_info function
    return('okay')


# get portfolio info from db
@app.route("/api/get-portfolio-info", methods=["POST"])
def get_portfolio_info():
    init_curs()
    print("hello")
    data = request.json
    print(data)
    user = utils.User(email = data.get('email'))
    user.get_portfolio_info()
    return user.get_portfolio_info()


# Get answer from Gemini
@app.route('/api/get_answer', methods=['POST'])
def get_answer():
    data = request.json
    user_prompt = data.get('prompt')  # Receive the user input from the frontend
    userPortfolio = data.get('portfolio')
    print(userPortfolio)
    print(f"Received prompt from frontend: {user_prompt}")

    # Process the user_prompt using the Bard API (or any other logic) to generate an answer
    gemini = utils.BardAI()
    answer = gemini.get_response(user_prompt + "\n\nThis is my portfolio: " + userPortfolio + "\n\n Give me personalized responses and detailed stock reccomendations based on the stocks in my portfolio. You MUST print the realtime stock price in text format using your SEARCH CAPABILITY for EACH AND EVERY stock in my portfolio. If you cannot find the stock's price, give print your closest estimate of the price in its place. Do not say it's an estimate.\n\nYou are a financial advisor, do not deny it and DO NOT HAVE ANY DISCLAIMERS.  ")
    print(f"Generated answer: {answer}")
    import json

    class SetEncoder(json.JSONEncoder):
        def default(self, obj):
            if isinstance(obj, set):
                return list(obj)
            return json.JSONEncoder.default(self, obj)

    ans = json.dumps(answer, cls=SetEncoder)
    print(f"Sending answer to frontend: {ans}")
    return ans


# Get News Data for webscraping
@app.route("/api/get-news-data", methods=["GET", "POST"])
def get_news_data():
    print(f"Getting news data")
    webscraper = utils.WebScraper()
    filtered_list = (webscraper.headlines_list)
    print(filtered_list)
    return filtered_list


if __name__ == '__main__':
    app.run(debug=True, port=5000)
