#!/Users/christine/anaconda3/bin/python
# -*- coding: utf-8 -*-

# https://predictivehacks.com/rule-based-matching-for-nlp-using-spacy/

# PATTERNS TO MATCH
# fox is/was [ADJ]
# fox [V] [ADV]
# [ADJ]* (and) [ADJ]* fox

import os, re, json, pandas as pd, spacy
from nltk import word_tokenize
from itertools import chain
from collections import Counter
from spacy.matcher import Matcher
from spacy.tokens import Span

DATA_PATH = '/Users/christine/csfat/gutenberg/data/text'
METADATA_PATH = '/Users/christine/csfat/gutenberg/metadata/metadata.csv'

# load spacy English model
nlp = spacy.load('en_core_web_sm')

# patterns to search for
patterns = [
	# PATTERN 1 - adjectives
	# add he's a ___?
	[
		{'LEMMA': 'fox'},
		{'LEMMA': 'be'},
		{'POS': 'ADV', 'OP': '*'},
		{'POS': 'ADJ', 'OP': '+'},
		{'LEMMA': 'and', 'OP': '?'},
		{'POS': 'ADV', 'OP': '*'},
		{'POS': 'ADJ', 'OP': '*'},
	],
	# PATTERN 2 - adjectives
	[
		{'POS': 'ADJ', 'OP': '*'},
		{'LEMMA': 'and', 'OP': '?'},
		{'POS': 'ADJ', 'OP': '+'},
		{'LEMMA': 'fox'},
	],
	# PATTERN 2 - verbs
	[
		{'LEMMA': 'fox'},
		{'POS': 'ADV', 'OP': '*'},
		{'POS': 'VERB'},
		{'POS': 'ADV', 'OP': '*'},
	],
]
matchers = []
for pattern in patterns:
	# initiate Matcher
	matcher = Matcher(nlp.vocab)
	matcher.add('Matching', None, pattern)
	matchers.append(matcher)

# read metadata
df = pd.read_csv(METADATA_PATH)
# print(df)
# print(df.columns)

# go through books one at a time
files = [x for x in os.listdir(DATA_PATH) if x.endswith('.txt')]
print('# files:', len(files))

test_text = "Hello this is just some random text alrighty then let's get started. The sneaky fox was back at it again. The crafy and sneaky fox snuck into my room. The crafty, lithe, and sneaky fox is super cool. Of all the animals, his fox is the coolest one. His fox is sneaky. The fox is very crafty. The bad foxes are stupid. The fox was really really dumb. The foxes were somewhat smart and clever."

book_ids = []
starts = []
ends = []
matches = []

i = 0
for f in files:
	f = DATA_PATH+'/'+ f
	# f = 'tales.txt' # for testing
	print(f)
	
	# read in file
	ein = open(f, 'r')
	text = ein.read().strip()
	ein.close()
	# text = test_text
	
	# skip if fox doesn't appear in text at all
	if 'fox' not in text.lower(): 
		print('SKIPPED')
		continue
	
	# search for patterns
	text = nlp(text)
	for matcher in matchers:
		matches_found = matcher(text)
		# print matches
		for match_id, start, end in matches_found:
			# get str representation 
			string_id = nlp.vocab.strings[match_id]  
			span = text[start:end]  # The matched span
			print(match_id, string_id, start, end, span.text)
			starts.append(start)
			ends.append(end)
			matches.append(span.text)
			book_ids.append(f)
	
	# break
	#
	# i += 1
	# if i > 10: break



df = pd.DataFrame({
	'book_id': book_ids,
	'start': starts,
	'end': ends,
	'match': matches,
})
df.to_csv('gutenberg.csv', index=False, encoding='utf-8-sig')





















