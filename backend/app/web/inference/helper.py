import pandas as pd
import numpy as np
from datetime import datetime, timedelta


def custom_label(input_date):
    # Get today's date
    today = datetime.now().date()

    # Get the date 1 day ago
    yesterday = today - timedelta(days=1)

    # Get the date 7 days ago
    previous_7_days = today - timedelta(days=7)

    # Get the date 30 days ago
    previous_30_days = today - timedelta(days=30)

    # Get the date 180 days ago
    previous_180_days = today - timedelta(days=180)

    # Convert input_date to date (ignoring the time component)
    input_date = input_date.date()

    # Categorize the date
    if input_date == today:
        return 'Today'
    elif input_date == yesterday:
        return 'Yesterday'
    elif input_date > previous_7_days:
        return 'Previous 7 Days'
    elif input_date > previous_30_days:
        return 'Previous 30 Days'
    elif input_date > previous_180_days:
        return 'Previous 180 Days'
    else:
        return 'More than 180 Days Ago'


def group_and_label_data(dataset):
    if dataset:
        df = pd.DataFrame(dataset)
        df['label'] = df.created_at.apply(custom_label)
        grouped = df.groupby('label').apply(lambda x: x.drop('label', axis=1).to_dict(orient='records')).to_dict()
        return grouped
    return {}