#!/Users/christine/anaconda3/bin/python
# -*- coding: utf-8 -*-

import os, re, requests, json, pandas as pd
from bs4 import BeautifulSoup
from nltk import word_tokenize
from itertools import chain
from collections import Counter

# read fable metadata
df = pd.read_csv('gibbs_texts.csv')

# get fable texts
texts = []
for URL in df['link']:
	# load page
	session = requests.Session()
	response = session.get(URL, timeout=5)
	soup = BeautifulSoup(response.content, 'html.parser')

	# get fable text
	p = [x.getText() for x in soup.findAll('p') if not x.findAll('a')]
	p = [re.sub('[ \n][ \n]+', ' ', x) for x in p][0]
	texts.append(p)

	print(URL)
	print(p)
	print('\n\n')

# save to .csv
char_length = [len(x) for x in df['text']]
word_length = [len(word_tokenize(x)) for x in df['text']]
df['char_length'] = char_length
df['word_length'] = word_length
df['text'] = texts
df.to_csv('gibbs_texts.csv', index=False, encoding='utf-8-sig')

# update info in fables.csv
df_charas = pd.read_csv('fables.csv')
df_charas = df_charas.drop('title', axis=1)
df_charas = df_charas.drop('link', axis=1)
df_charas = df_charas.join(df.set_index('id'))
df_charas.to_csv('fables.csv', index=False, encoding='utf-8-sig')



