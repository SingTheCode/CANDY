
from konlpy.tag import Okt
import json
import os
from pprint import pprint
import numpy as np
import nltk
from tensorflow.keras import models
from tensorflow.keras import layers
from tensorflow.keras import optimizers

def read_data(filename):
    with open(filename, 'r' ,encoding = 'utf8') as f:
        data = [line.split(',') for line in f.read().splitlines()]
        # txt 파일의 헤더(id document label)는 제외하기
        #data = data[0:2]

    return data


train_data = read_data('labeldata.csv')

from keras.models import load_model
model = load_model('model.h5')


from sklearn.model_selection import train_test_split
train_data, test_data = train_test_split(train_data,test_size=0.3,shuffle=False)

for i in range (0,len(train_data)):
    train_data[i] = train_data[i][0:2]

okt = Okt()

def tokenize(doc):
    # norm은 정규화, stem은 근어로 표시하기를 나타냄
    return ['/'.join(t) for t in okt.pos(doc, norm=True, stem=True)]

# if os.path.isfile('train_docs.json'):
with open('train_docs.json' ,'r', encoding="utf-8") as f:
    train_docs = json.load(f)
with open('test_docs.json' ,'r', encoding="utf-8") as f:
    test_docs = json.load(f)
# else:
#     train_docs = [(tokenize(row[0]), row[1]) for row in train_data]
#     test_docs = [(tokenize(row[0]), row[1]) for row in test_data]
#     # JSON 파일로 저장
#     with open('train_docs.json', 'w', encoding="utf-8") as make_file:
#         json.dump(train_docs, make_file, ensure_ascii=False, indent="\t")
#     with open('test_docs.json', 'w', encoding="utf-8") as make_file:
#         json.dump(test_docs, make_file, ensure_ascii=False, indent="\t")
tokens = [t for d in train_docs for t in d[0]]
text = nltk.Text(tokens, name='NMSC')
vocab_size = len(set(text.tokens))

import matplotlib.pyplot as plt
from matplotlib import font_manager, rc

font_fname = 'c:/windows/fonts/gulim.ttc'
font_name = font_manager.FontProperties(fname=font_fname).get_name()
rc('font', family=font_name)
selected_words = [f[0] for f in text.vocab().most_common(1000)]


def term_frequency(doc):
    return [doc.count(word) for word in selected_words]



def predict_pos_neg(review):
    token = tokenize(review)
    tf = term_frequency(token)
    data = np.expand_dims(np.asarray(tf).astype('float'), axis=0)
    score = model.predict(data).astype('float')
    score = score[0]
    score = str(score).split('[')[1]
    score = str(score).split(']')[0]
    score = str(score).split(' ')
    for i in range(0, len(score)):
        if float(score[i]) >= 0.9 : score[i] = float(score[i]) - 0.30
        else : score[i] = float(score[i]) + 0.10
        score[i] = round(score[i],1) * 50

    return score

list = ["오늘 존잼", "오늘은 하루가 길었다ㅠㅠ,,항상 화이팅", "부모님과 다투었\
다..후회되는 날", "와 재밋다", "너무 힘들다,, 우울해"]

from connect_server import con_server
con = con_server()
result = con.get_data()
print(result)
res = predict_pos_neg(result[0])
con.send_data(res)
























