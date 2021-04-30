#!/Users/christine/anaconda3/bin/python
# -*- coding: utf-8 -*-

import os, re, json, pandas as pd
from itertools import chain
from collections import Counter

# read metadata
with open('gutenberg_metadata2.json') as ein:
	metadata = json.load(ein)

# read matches
df = pd.read_csv('gutenberg2.csv')
df = df[df.match_type == 3] # filter match type

# filter duplicate matches
# for each book
for book in set(df['book_id']):
	df_temp = df[df['book_id'] == book]
	df_temp = df_temp.sort_values(by=['start'])
	print(df_temp)
	
	starts = list(df_temp['start'])
	ends = list(df_temp['end'])
	
	# starts = [-10,0,1,2,20,20,31]
	# ends = [-5,10,11,12,30,33,40]
	
	start = starts[0]
	end = ends[0]
	
	final = [(start, end)]
	
	for s,e in zip(starts, ends):
		if s <= start: final[-1] = (s,e)
		elif s <= end:
			if e >= end: 
				final[-1] = (start,e)
				s = start
			else: continue
		else:
			final.append((s,e))
		start = s
		end = e
	
	print(final)
	
	text = open(book, 'r').read()
	for pair in final:
		print(pair, text[pair[0]:pair[1]])
	break
	

# # number of unique books included in results
# books = list(set(df['book_id']))
# print('# books:', len(books))
#
# # get word counts
# words = [x.split(' ') for x in df['match']]
# words = list(chain.from_iterable(words))
# counts = Counter(words)
# print(counts)
# counts = dict(Counter(words))
#
# # save as csv
# df = pd.DataFrame({
# 	'word': list(counts.keys()),
# 	'count': list(counts.values()),
# })
# df = df.sort_values(by=['count'], ascending=False)
# df.to_csv('wordcounts.csv', index=False, encoding='utf-8-sig')
#
#
#
#











