import pandas as pd
import numpy as np
import sklearn.datasets as ds
#from flask_cors import CORS, cross_origin

from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

#USE ONE OF THESE TO SCALE DATA
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler

# from sklearn.datasets import make_classification
# from sklearn.datasets import make_moons
# from sklearn.datasets import make_circles

def scale_data(data, new_limits, inplace=False ):
    if not inplace:
        data = data.copy()
    min_x, min_y = np.ndarray.min(data[:,0]), np.ndarray.min(data[:,1])
    max_x, max_y = np.ndarray.max(data[:,0]), np.ndarray.max(data[:,1])
    min_x_new, max_x_new = new_limits[-1]
    min_y_new, max_y_new = new_limits[1]

    data -= np.array([min_x, min_y]) 
    data *= np.array([(max_x_new - min_x_new) / (max_x - min_x), (max_y_new - min_y_new) / (max_y - min_y)])
    data += np.array([min_x_new, min_y_new]) 
    if inplace:
        return None
    else:
        return data

def generateMoons():
    features_x, labels_y = ds.make_moons(n_samples=150, shuffle=True, noise=0.03, random_state=10)

    scaler = MinMaxScaler()
    scaled_x = scaler.fit_transform(features_x)
    return scaled_x, labels_y

def generateCircles():
    features_x, labels_y = ds.make_circles(n_samples=300,  shuffle=True, noise=0.01, random_state=10)

    scaler = MinMaxScaler()
    scaled_x = scaler.fit_transform(features_x)
    return scaled_x, labels_y

def generateClass():
    features_x, labels_y = ds.make_classification(n_samples=300,  shuffle=True, noise=0.01, random_state=10)
    scaler = StandardScaler()
    scaled_x = scaler.fit_transform(features_x)
    return scaled_x, labels_y

def generateLine():
    return (
        np.round([np.random.uniform(0.3, 0.5) * (x * 3 + 5) for x in range(1000)], 2),
        range(1000),
    )
