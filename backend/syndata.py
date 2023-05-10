from faker import Faker
import pandas as pd


def generateSyntheticData():
    fake = Faker()
    #synthetic = fake.name()
    dataframe = pd.DataFrame(
    [
        {
            "name": fake.name(),
            "address": fake.address(),
            "birthday": fake.date_of_birth(),
            "email": fake.email(),
            "password": fake.password(),
        }
        for _ in range(100)
    ]
)
