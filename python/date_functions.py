import datetime

def convert_to_date(date_time): 
    format = '%Y-%m-%d' # The format 
    try: 
        datetime_str = datetime.datetime.strptime(date_time, format) 
    except:
        datetime.datetime.now().strptime(format) 
    return datetime_str 

def convert_to_str (date_time):

    format = "%d-%m-%Y" # The format 
    datetime_str = datetime.datetime.strftime(date_time, format) 
   
    return datetime_str 