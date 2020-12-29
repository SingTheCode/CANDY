import requests, json


class con_server:

    def __init__(self):
        self.url = "http://172.30.1.58:3000/python"

    def get_data(self):
        str = ""
        in_data = {'data' : 'data'}
        in_headers = {}
        response = requests.post(url=self.url, data = str)

        try:
            result = response.text
            return result
        except Exception as e:
            print(e)

    def send_data(self, data):
        # out_data = {
        #     'name' : data,
        #     'result' : data
        # }
        out_headers = {}
        print(data)
        requests.post(url = self.url, data = str(data))


# if __name__ == "__main__" :
#     con = con_server()
#     result = con.get_data()
#     print(result)
#     con.send_data(result)
#     print(result)
