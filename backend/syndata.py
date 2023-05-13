from faker import Faker
import pandas as pd


def generateLine():
    return (
        np.round([np.random.uniform(0.3, 0.5) * (x * 3 + 5) for x in range(1000)], 2),
        range(1000),
    )


def generateSyntheticData():
    fake = Faker()
    # synthetic = fake.name()
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
