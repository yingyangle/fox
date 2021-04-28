#!/Users/christine/anaconda3/bin/python
# -*- coding: utf-8 -*-

import os, re, json, pandas as pd
from itertools import chain
from collections import Counter

# read metadata
with open('gutenberg_metadata1.json') as ein:
	metadata = json.load(ein)
# save metadata as json
df = pd.read_json('gutenberg_metadata1.json', orient='index')
df.to_csv('gutenberg_metadata1.csv', index=False, encoding='utf-8-sig')

# read matches
df = pd.read_csv('gutenberg1.csv')
# df = df[df.match_type == 2] # filter match type

# number of unique books included in results
books = list(set(df['book_id']))
print('# books:', len(books))

# get word counts
words = [x.split(' ') for x in df['match']]
words = list(chain.from_iterable(words))
counts = Counter(words)
print(counts)
counts = dict(Counter(words))

# save as csv
df = pd.DataFrame({
	'word': list(counts.keys()),
	'count': list(counts.values()),
})
df = df.sort_values(by=['count'], ascending=False)
df.to_csv('wordcounts.csv', index=False, encoding='utf-8-sig')















