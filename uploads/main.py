import os
import sys
from flask_restful import Api
from flask_cors import CORS
from datetime import datetime
from flask import request
from resources.api.mailing import setcontact, setypemail, getalltypemail, testmailing
from flask_jwt_extended import JWTManager, jwt_required
from resources.api.avis import api_avis
# from resources.auth import auth_blueprint
from resources import auth_blueprint, avis_blueprint
from config import CONF_FILE
import json
from config import app
import config
from waitress import serve

# Get the application instance
connex_app = config.connex_app


# @app.route('/test', methods=['GET', 'POST'])
# @jwt_required
# def test():
#     if request.method == 'GET':
#         n = request.args.get("n")
#         return 'Hello Fred %s' % n
#     else:
#         return 'Méthode différente de GET utilisée'


@app.route('/contacts', methods=['GET', 'POST'])
def contacts():
    if request.method == 'POST':
        if request.files:
            file = request.files["csvfile"]
            return setcontact(file)
        return {
                   'statut': 'KO',
                   'comment': 'no file'
               }, 400
    return 'GET not configured yet'


@app.route('/mailtype', methods=['GET', 'POST'])
def typemail():
    if request.method == 'POST':
        if request.files:
            file = request.files["mailtype"]
            return setypemail(file)
        return {
                   'statut': 'KO',
                   'comment': 'no file'
               }, 400
    return getalltypemail()


@app.route('/sendmailtest', methods=['POST'])
def sendmail_test():
    print('debut')
    # print(request.form["template"])
    print(request.args.get('template'))
    if request.args.get('receiver'):
        return testmailing(request.args.get('template'), request.args.get('receiver'))
    return testmailing(request.args.get('template'))


if not os.path.exists(CONF_FILE):
    print('error : no conf file (name : ', CONF_FILE, ')')
    sys.exit()


class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return json.JSONEncoder.default(self, obj)


app.config['JWT_SECRET_KEY'] = 'ffwerrg5jufikl4xref5e3gerth68b45dv'
# Pour que les tokens expires ne declenchent pas d'erreurs 5xx: https://github.com/vimalloc/flask-jwt-extended/issues/141
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['RESTFUL_JSON'] = {
    'cls': CustomJSONEncoder
}
JWTManager(app)

CORS(app)
api = Api(app, catch_all_404s=True)
app.register_blueprint(auth_blueprint)
app.register_blueprint(avis_blueprint)

if __name__ == "__main__":
    # api = Api(app, catch_all_404s=True)
    # app.run(debug=True, host='0.0.0.0', port=5005, url_scheme='https')
    # app.send_header('Access-Control-Allow-Origin', '*')
    serve(app, host='0.0.0.0', port=5005)
