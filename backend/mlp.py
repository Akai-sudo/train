# frame za večnivojski perceptron
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import confusion_matrix, accuracy_score

from functools import partial


import json
import numpy as np

from sklearn import linear_model


class NumpyEncoder(json.JSONEncoder):
    """Special json encoder for numpy types"""

    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


def getLoss(neuralnet):
    return neuralnet.loss_


def getBestLoss(neuralnet):
    return neuralnet.best_loss_


def getFeatures(neuralnet):
    return neuralnet.n_features_in_


weights_history = []
loss_function = []


def save_weights(model):
    weights = model.coefs_
    weights_history.append(weights)


# fit_with_logging = partial(model.fit, callback=save_weights)
# fit_with_logging(X, y)

# def linearReg():
#     regression_model = linear_model.LinearRegression()


# In the neural network terminology:

# one epoch = ONE FORWARD PASS AND ONE BACKWARD PASS of all the training examples
# batch size = the number of training examples in one forward/backward pass. The higher the batch size, the more memory space you'll need.
# number of iterations = number of passes, each pass using [batch size] number of examples. To be clear, one pass = one forward pass + one backward pass (we do not count the forward pass and backward pass as two different passes).





def generateNetwork():
    dataset = load_digits()

    # a to rabim - data preprocessing
    # X = dataset.iloc[:,:-1].values  #independent variable array
    # y = dataset.iloc[:,1].values  #dependent variable vector

    x_train, x_test, y_train, y_test = train_test_split(
        dataset.data, dataset.target, test_size=0.20, random_state=4
    )

    ### Linear regressor
    # regressor = LinearRegression()
    # regressor.fit(x_train, y_train)
    # y_pred = regressor.predict(X_test)
    # print(y_pred)
    ### END Linear regressor

    NN = MLPClassifier()
    NN.fit(x_train, y_train)
    y_pred = NN.predict(x_test)

    attributes = {}
    attributes = getLoss(NN)

    accuracy = accuracy_score(y_test, y_pred) * 100
    confusion_mat = confusion_matrix(y_test, y_pred)

    dumped = json.dumps(confusion_mat, cls=NumpyEncoder)

    return dumped
