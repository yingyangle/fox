#!/Users/christine/anaconda3/bin/python
# -*- coding: utf-8 -*-

import os, re, json, pandas as pd
from collections import Counter
from nltk import word_tokenize
from nltk.stem import WordNetLemmatizer

lem = WordNetLemmatizer()

df = pd.read_csv('survey_results.csv')

print(df.columns)
print(df.shape)

adj = df['What are the first 5 ADJECTIVES that come to mind when you think of foxes?']
verbs = df['What are the first 5 VERBS that come to mind when you think of foxes?']

adj_full = []
verbs_full = []

for a,v in zip(adj, verbs):
	a = re.sub(r' +', ' ', a)
	v = re.sub(r' +', ' ', v)
	a_tokens = word_tokenize(a.lower())
	v_tokens = word_tokenize(v.lower())
	if ',' in a:
		adj_full.extend([lem.lemmatize(x.strip()) for x in a_tokens])
	else:
		adj_full.extend([lem.lemmatize(x.strip()) for x in a_tokens])
	if ',' in v:
		verbs_full.extend([lem.lemmatize(x.strip()) for x in v_tokens])
	else:
		verbs_full.extend([lem.lemmatize(x.strip()) for x in v_tokens])

adj_count = Counter(adj_full)
verbs_count = Counter(verbs_full)

print(adj_count)
print(verbs_count)

# save to csv - ADJ
words = []
counts = []
for a in adj_count:
	words.append(a)
	counts.append(adj_count[a])

df = pd.DataFrame({'name': words, 'count': counts})
df.to_csv('survey_adj.csv', index=False, encoding='utf-8-sig')

# save to csv - VERB
words = []
counts = []
for a in verbs_count:
	words.append(a)
	counts.append(verbs_count[a])

df = pd.DataFrame({'name': words, 'count': counts})
df.to_csv('survey_verbs.csv', index=False, encoding='utf-8-sig')





