import pandas as pd
import numpy as np


def custom_label(group):
    today = pd.Timestamp.today()
    yesterday = today - pd.Timedelta(days=1)
    last_week = today - pd.Timedelta(weeks=1)
    last_month = today - pd.Timedelta(days=30)

    if group.index[0] >= last_month:
        return 'Last Month'
    elif group.index[0] >= last_week:
        return 'Previous 7 Days'
    elif group.index[0] >= yesterday:
        return 'Yesterday'
    else:
        return 'Today'


def group_and_label_data(dataset):
    df = pd.DataFrame(dataset)
    df.created_at = df.index.map(lambda x: np.datetime64(x, 'ns').astype(np.int64))
    df_grouped = df.groupby(pd.Grouper(key='created_at', freq='D')).apply(custom_label)
    return df_grouped.to_dict()
