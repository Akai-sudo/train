from flask import Flask, jsonify, Response, render_template
from flask_cors import CORS, cross_origin
import numpy as np
import pandas as pd
import json

from mlp import generateNetwork

app = Flask(__name__)
#CORS(app)





# fake = Faker(['en_US', 'en_UK', 'it_IT', 'de_DE', 'fr_FR'], use_weighting=True)

# customers = {}
# for i in range(0, 20):
    # customers[i]={}
    # customers[i]['id'] = i+1
    # customers[i]['name'] = fake.name()
    # customers[i]['address'] = fake.address().replace('\n', ', ')
    # customers[i]['phone_number'] = fake.phone_number()
    # customers[i]['dob'] = fake.date()
    # customers[i]['note'] = fake.text().replace('\n', ' ')
    # customers.append(fake.name())


#df = pd.DataFrame(customers).T

#print(df)
#df.to_csv('customer_data.csv', index=False)





@app.route('/', methods=["GET"])
@cross_origin() # allow all origins all methods
def deploymlp():
    # response_body = {
    #     "name": "trAIn",
    #     "about" :"This will visualize a multilayered perceptron"
    # }
    # response = jsonify(message="Simple server is running")
    # response.headers.add("Access-Control-Allow-Origin", "*")
    # return response

    # dataset = load_digits()
    # x_train, x_test, y_train, y_test = train_test_split(dataset.data, dataset.target, test_size=0.20, random_state=4)
    # NN = MLPClassifier()

    # NN.fit(x_train, y_train)
    # y_pred = NN.predict(x_test)
    # accuracy = accuracy_score(y_test,y_pred)*100
    # confusion_mat = confusion_matrix(y_test,y_pred)
    networkparams = {}
    networkparams = generateNetwork()

    #response = jsonify(getlist(networkparams, type=int))
    array = jsonify(networkparams)
    #response = array.tolist()


    #r = Response(response="TEST OK", status=200, mimetype="application/json")
    #r.headers["Content-Type"] = "text/json; charset=utf-8"
    #r.headers.add("Access-Control-Allow-Origin", "*")

    #response.headers.add("Access-Control-Allow-Origin", "*")
    #return render_template('index.html', data=response)
    # return jsonify({
    #     'OK': True, 
    #     'message':'Success',
    #     'data': array
    # })
    return networkparams  #tkole na tak način actually dela wtf




if __name__ == '__main__':
    app.run()