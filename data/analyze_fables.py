#!/Users/christine/anaconda3/bin/python
# -*- coding: utf-8 -*-

import os, re, json, pandas as pd, requests
from bs4 import BeautifulSoup
from nltk import word_tokenize
from itertools import chain
from collections import defaultdict
from statistics import mean

df = pd.read_csv('fables.csv')

animal_lengths = defaultdict(lambda: defaultdict(list))

for i,row in df.iterrows():
	chara = row['character']
	wordlen = row['word_length']
	charlen = row['char_length']
	if wordlen == wordlen: animal_lengths[chara]['word'].append(wordlen)
	if charlen == charlen: animal_lengths[chara]['char'].append(charlen)
	# print(chara, wordlen, charlen, animal_lengths[chara])

animal_avgs = {
	'animal': [],
	'word': [],
	'char': [],
	'stories': [],
}

for animal in animal_lengths:
	try: 
		# print(animal, mean(animal_lengths[animal]['word']), mean(animal_lengths[animal]['char']))
		animal_avgs['animal'].append(animal)
		animal_avgs['word'].append(mean(animal_lengths[animal]['word']))
		animal_avgs['char'].append(mean(animal_lengths[animal]['char']))
		animal_avgs['stories'].append(len(animal_lengths[animal]['word']))
	except: pass

df = pd.DataFrame(animal_avgs)
df = df.sort_values(by=['word'], ascending=False)
df = df[df.stories > 5]
df.to_csv('fable_wordlens.csv', index=False, encoding='utf-8-sig')