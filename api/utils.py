'''

This utils model is generally the entire backend for our project.
It makes the app.py file with the routes look simple but all the
detailed coding will be here and utilized there in a simple manner.

So far this is just being used for login/registration purposes but as

we need features those will go here too (like API stuff ya feel).


BCRYPT is the module we are using for encryption of passwords/user IDs
Introduce the firebase module to work with Google Authentication (trust)
'''


import bcrypt
import json
import requests
from bs4 import BeautifulSoup

import firebase_admin
import os 

import yfinance as yf

from flask import make_response
from datetime import datetime
from firebase_admin import initialize_app, db, credentials, auth

# from bardapi import Bard

from gemini import Gemini


# Authenticate Firebase, Establish Connection
# Use an absolute path or ensure the relative path is correct
cred_path = os.path.join(os.path.dirname(__file__), 'secrets/wealthwise-46f60-firebase-adminsdk-ykq1h-8f0adf534c.json')
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

# Initialize CORS
def init_curs():
    response = make_response()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET')
    response.headers.add('Access-Control-Allow-Methods', 'POST')

# This function is for when the user is registering with email,
# password, first name, and last name. If they use Google Sign-in
# then this method is never called.
def agg_vals(data):
    email = data.get("email")
    pwd = data.get('password')
    fname = data.get('fname')
    lname = data.get('lname')
    return email, pwd, fname, lname

# This is just a simplified function created because I'm lazy, when the
# user is logging in with email and password and NOT Google.
def agg_vals_login(data):
    email = data.get("email")
    pwd = data.get('password')
    return email, pwd

def graphStock(tickersymbol):
    tickerSymbol = tickersymbol
    tickerData = yf.Ticker(tickerSymbol)
    tickerDF = tickerData.history(period = '1d', start='2015-5-23', end='2023-6-23')
    tickerDF = tickerDF[['Close']]
    return tickerDF

'''
This class goes kinda crazy. It's the basis for every interaction on the login/register
pages, I create a user object to handle all of the code in a simple manner that is somewhat
masked on the app.py file. Depending on what type of user they are (default or Google), class 
methods vary. 

If a user is created through Google, they will not have a "pwd" attribute and if
a user is created normally, they will not have an "id" attribute. This is the primary distinction
that is used throughout the code to determine if a user is Google-generated or not. 
'''
class User(object):
    def __init__(self, email=None, pwd=None, fname=None, lname=None, id=None):
        self.email = email
        self.pwd = pwd
        self.fname = fname
        self.lname = lname
        self.id = id
        self.fullname = f"{fname} {lname}"
        self.regdate = datetime.utcnow()
        self.portfolio = {}

    # Firebase has some requirements for key names and since
    # we use emails as the key name, AND there are no "." characters
    # allowed, which is dumb. So I just created this blurb cuz again, lazy.
    def _encode_emailHTML(self):
        return self.email.replace('.', ',')

    # I don't see why I'd use this if a user created a normal account,
    # again this is just for Google accounts
    def _split_name(self):
        if not self.pwd:  # Distinguishing factor
            self._get_google_user_name()
            fname = self.fullname.split()[0]
            lname = self.fullname.split()[1]  # man if they have more than two names then they got bigger problems
            self.fname = fname
            self.lname = lname
        return self.fname, self.lname

    # The basis of the password encryption using the "Bcrypt" module
    # Sends some gibberish randomized encoded password to the DB instead of
    # the raw password for security purposes (protected function for a reason)
    def _encode_pwd(self):
        pwd = self.pwd.encode('utf-8')
        salt = bcrypt.gensalt()  # Generate a random salt
        hashed_password = bcrypt.hashpw(pwd, salt)
        return hashed_password

    # Basis of Google user ID encryption using "Bcrypt" module
    # Randomized gibberish trust me it's random I don't get it
    # SECURITY!!! GRAPE!!!! PILOT PILOT
    def _encode_google_id(self):
        goog_id = self.id.encode('utf-8')
        salt = bcrypt.gensalt()  # Generate a random salt
        hashed_id = bcrypt.hashpw(goog_id, salt)
        return hashed_id

    # Protected method to see if user exists in the database to avoid duplicate entries.
    def _check_user_exists(self):
        users_ref = db.reference('users')  # DB connection
        if self.pwd:  # Distinguishing factor
            user_data = users_ref.child(self._encode_emailHTML()).get()  # If they used email sign in
        else:
            user_data = users_ref.child(self._get_user_email()).get()  # If they used Google Sign In
        return user_data  # realest code
    def post_portfolio_info(self, portfolio:dict, isDelete = False):
        users_ref = db.reference('users')
        user_data = users_ref.child(f'{self._encode_emailHTML()}/portfolio').get()
        if user_data is not None and not isDelete:
            user_data.update(portfolio)
        else:
            user_data = portfolio
        if isDelete:
            self.delete_portfolio_info()
        print(user_data)
        print(self._encode_emailHTML())# DB connection
        user_poof = users_ref.child(self._encode_emailHTML()).update(
            {
                'portfolio': user_data
            }
        )

    def delete_portfolio_info(self):
        users_ref = db.reference('users')
        users_ref.child(f'{self._encode_emailHTML()}/portfolio').delete()

    def get_portfolio_info(self):
        users_ref = db.reference('users')
        return users_ref.child(f'{self._encode_emailHTML()}/portfolio').get()

    # The ACTUAL authentication block behind the login (obviously protected method, DO NOT FIDDLE)
    # I put a "pwd" boolean parameter so the app.py file which gets the POST request can tell me
    # if the user is logging in through Google ID or normal legacy login.
    def _check_creds(self, pwd:bool):
        if self._check_user_exists():
            if pwd:  # legacy login
                hashed_password = self._check_user_exists().get('hashed_password', '')
                if bcrypt.checkpw(self.pwd.encode('utf-8'), hashed_password.encode('utf-8')):  # decryption
                    print("success")
                    return True, 200  # user entered correct password, allow login
                else:
                    print("incorrect")
                    return False, 401  # user entered incorrect password, deny login
            else:
                user_id = self._check_user_exists().get('id', '')
                if bcrypt.checkpw(self.id.encode('utf-8'), user_id.encode('utf-8')):  # decryption
                    print("user used google and logged in")
                    return True, 200  # google account is logged in
                else:
                    print("google user does not exist")
                    return False, 402  # google account never registered wit us :(

        else:
            print('user no exist')
            return False, 400  # user never registered wit us at all >:(

    # Main code for registering a user, DO NOT FIDDLE!
    def reg_user(self):
        ref = db.reference('users')  # DB connection
        try:
            if not self._check_user_exists():  # has the user created account wit us?
                if self.pwd:  # legacy account?
                    ref.child(self._encode_emailHTML()).set({
                        'username': f"{self._encode_emailHTML()}",
                        'id': "none",  # NOTE how ID is NONE for legacy accounts
                        'hashed_password': f"{self._encode_pwd().decode('utf-8')}",
                        'first_name': self.fname,
                        'last_name': self.lname,
                        'regdate': f"{self.regdate}"
                    })
                else:  # registering with Google!
                    self._split_name()
                    ref.child(self._get_user_email()).set({
                        'username': f"{self._get_user_email()}",
                        'id': f"{self._encode_google_id().decode('utf-8')}",
                        'hashed_password': 'none',  # NOTE how PASSWORD is NONE for Google accounts
                        'first_name': self.fname,
                        'last_name': self.lname,
                        'regdate': f"{self.regdate}"
                    })

                return True, 200  # User has been added to DB!
            else:
                return False, 401  # User already exists in DB!
        except Exception as e:
            print(f"Exception: {e}")
            return False, 400  # Something crazy happened, server error please debug if this happens.

    # LOGGING IN USER (DO NOT FIDDLE)
    def login_user(self, pwd: bool):
        stat, err = self._check_creds(pwd)  # Check credentials
        if not stat:  # If they not legit, look at the _check_creds() method for error codes
            if err == 401:
                return False, "Incorrect Password"
            elif err == 402:
                return False, "User does not exist, Google Log In"
            else:
                return False, "User does not exist"
        return True, 200  # Log in this user

    # Get user email string if they used GOOGLE log in, since they do not provide it and update self.email
    def _get_user_email(self):
        decoded_token = auth.verify_id_token(self.id)
        user_email = decoded_token.get("email")
        self.email = user_email
        return self._encode_emailHTML()

    # Get a user name string if they used GOOGLE log in and update self.fullname
    def _get_google_user_name(self):
        decoded_token = auth.verify_id_token(self.id)
        user_name = decoded_token.get("name")
        self.fullname = user_name
        return self.fullname

class BardAI(object):

    def __init__(self):

        cookies = {"_ga":"GA1.1.433599624.1712448754","AEC":"AQTF6HwWYk8cHD8KtVQfQW9jcmN0wfC_82W1bLuoZHH7R7fU22TcHWdI7g","SID":"g.a000kQjePJ8ZwgvSdXaY7x_wpNDNUoqM_czUrDdf-_0VV_phk2HxA5aPEnv2H96SyJbyv2jRwgACgYKASUSAQASFQHGX2MiPoPzMMsADQlcSj-AHOBpaRoVAUF8yKrCqj_rdLhGZ8OGemCgmLEn0076","__Secure-1PSID":"g.a000kQjePJ8ZwgvSdXaY7x_wpNDNUoqM_czUrDdf-_0VV_phk2HxnwsqFysKUxyDKNyqYax4WAACgYKAewSAQASFQHGX2MinYNWIqeQsP6Cxb3rFmf9pRoVAUF8yKrb_0nAU_uSW4ddGdQONK3-0076","__Secure-3PSID":"g.a000kQjePJ8ZwgvSdXaY7x_wpNDNUoqM_czUrDdf-_0VV_phk2HxaLGH8jrGtri9Bh4xB34yugACgYKARwSAQASFQHGX2Mi5iy_fy9GCoYXp8Lk_rrCSRoVAUF8yKobGwewHsPRa4IBCimtAgpo0076","HSID":"AH2mKYYudKGBPuVgu","SSID":"AIICINJIrKl_G6XKy","APISID":"ph4-0K8Dz-mVzLi3/AXOyqUOEE9fwtbAFr","SAPISID":"mX_zZMmgxRHrjSb1/AAHFig4THILa9XFXU","__Secure-1PAPISID":"mX_zZMmgxRHrjSb1/AAHFig4THILa9XFXU","__Secure-3PAPISID":"mX_zZMmgxRHrjSb1/AAHFig4THILa9XFXU","_ga_WC57KJ50ZZ":"GS1.1.1717646844.4.1.1717646891.0.0.0","__Secure-1PSIDTS":"sidts-CjIB3EgAEhm7hUrZGS4R9DPrWuZsD0M0cVmEP2kQ8-Nmikj2Pc409gBjJWG8K0W3wzYecxAA","__Secure-3PSIDTS":"sidts-CjIB3EgAEhm7hUrZGS4R9DPrWuZsD0M0cVmEP2kQ8-Nmikj2Pc409gBjJWG8K0W3wzYecxAA","NID":"515","SIDCC":"AKEyXzXW0P1NeN_Ckg_KVbCVDfYCZCytO9stmHyqVM6cbUem0mgH0LR3sYMooUWmA5ldcfVtBLY","__Secure-1PSIDCC":"AKEyXzWiwBmmWqwPQ3YckLIb_QY84UD6QhSUGjyIbQtf2vDbpqCn3dR5d9PRD33zuVXa79AlxNM","__Secure-3PSIDCC":"AKEyXzXqt8P8HbUUrN8mmLzYZiOzHZZE3yyMqBbzPENUeJpd8pfI8OK89eI5vIs3Zn7WzJov5eE"}
        self.bard = Gemini(cookies=cookies)
        #
        # GOOGLE_API_KEY = "AIzaSyASoC8oPKQM1XE9rhw8i0rQKTZSvflA7jE"
        # genai.configure(api_key=GOOGLE_API_KEY)
        # self.model = genai.GenerativeModel('gemini-pro')

    def get_response(self, query):
        response = self.bard.generate_content(query)
        return response.text

bard = BardAI()
print(bard.get_response("tell me about paul george"))

class WebScraper(object):
    def __init__(self):
        self.url = "https://finance.yahoo.com/news/"
        self.page = requests.get(self.url)
        self.soup = BeautifulSoup(self.page.content, "html.parser")
        self.headlines_list = []
        self.load_data()

    def load_data(self):
        items = self.soup.find_all('li', class_='js-stream-content')
        for item in items:
            # Extract source or date
            date_source_div = item.find('div', class_='C(#959595)')
            if date_source_div:
                date_source = date_source_div.get_text(strip=True)
            else:
                date_source = None

            # Extract title and URL
            title_anchor = item.find('a', class_='mega-item-header-link') or item.find('a',
                                                                                       class_='Fz(13px) LineClamp(4,96px) C(#0078ff):h Td(n) C($c-fuji-blue-4-b) smartphone_C(#000) smartphone_Fz(19px)')
            if title_anchor:
                title = title_anchor.get_text(strip=True)
                url = title_anchor['href']
                if url.startswith('/news'):
                    url = "https://finance.yahoo.com" + url
            else:
                title, url = None, None

            # Extract content
            content_p = item.find('p')
            if content_p:
                content = content_p.get_text(strip=True)
                content = f"{content[0:150]}..."
            else:
                content = None

            # Extracting image URL from the first type of snippet
            img_tag = item.find('img')
            if img_tag and 'src' in img_tag.attrs:
                img_url = img_tag['src']
            else:
                # Extracting image URL from the second type of snippet (background-image style)
                div_with_bg = item.find('div', style=lambda value: value and "background-image" in value)
                if div_with_bg:
                    style_content = div_with_bg['style']
                    # Extracting URL from the style content
                    img_url = style_content.split('url(')[-1].split(')')[0].replace('"', '')
                else:
                    img_url = 'https://childrenshospitals.ca/wp-content/themes/sme-cchf-child/images/placeholder-news.jpg'

            # (0) article source, (1) article title, (2) short summary, (3) article url, (4) image url
            self.headlines_list.append((date_source, title, content, url, img_url))

        # Convert headlines_list to JSON and print it
        # raw_json_data = json.dumps(self.headlines_list, indent=4)
        # print(raw_json_data)