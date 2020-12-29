import requests
import json
import Adafruit_DHT as dht
h,t = dht.read_retry(dht.DHT22, 4)
print ('Temp={0:0.1f}*C Humidity={1:0.1f}%'.format(t, h))

url = "http://localhost:3000"
#data =  {'msg': 'Hi!!!'}
data =  {'msg': '{0:0.1f}*C Humidity={1:0.1f}%'.format(t, h)}
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
r = requests.post(url, data=json.dumps(data), headers=headers)
