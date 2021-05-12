#!/Users/christine/anaconda3/bin/python
# -*- coding: utf-8 -*-

import os, re, json, pandas as pd

# df = pd.read_csv('survey_adj.csv')
# data = []
# for i,row in df.iterrows():
# 	d = {
# 		'name': row['name'],
# 		'count': row['count'],
# 		'type': row['type']
# 	}
# 	data.append(d)
# with open('survey_adj.json', 'w') as aus:
# 	json.dump(data, aus)
#
# df = pd.read_csv('survey_verbs.csv')
# data = []
# for i,row in df.iterrows():
# 	d = {
# 		'name': row['name'],
# 		'count': row['count'],
# 	}
# 	data.append(d)
# with open('survey_verbs.json', 'w') as aus:
# 	json.dump(data, aus)

df = pd.read_csv('wordcounts2_edited.csv')
data = []
for i,row in df.iterrows():
	d = {
		'name': row['word'],
		'value': row['value'],
		'type': row['type']
	}
	data.append(d)
with open('wordcounts2_edited.json', 'w') as aus:
	json.dump(data, aus)













