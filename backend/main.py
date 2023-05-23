from flask import Flask, request
from flask_cors import CORS, cross_origin

from mlp import generateNetwork

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

#CORS(app)
cors = CORS(app, resources={r"/": {"origins": "*"}})

@app.route('/', methods=["GET", "POST"])
@cross_origin()
def deploymlp():

    dataset = request.json.get('selectedDataset')

    print("We want dataset: ", dataset)
    networkparams = {}
    networkparams = generateNetwork(dataset)

    
    return networkparams 




if __name__ == '__main__':
    app.run()