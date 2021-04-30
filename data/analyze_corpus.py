#!/Users/christine/anaconda3/bin/python
# -*- coding: utf-8 -*-

# https://predictivehacks.com/rule-based-matching-for-nlp-using-spacy/
# https://spacy.io/api/matcher
# https://stackoverflow.com/questions/40288323/what-do-spacys-part-of-speech-and-dependency-tags-mean
# https://spacy.io/api/data-formats/#pos-tagging

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

DATA_PATH = 'texts'

# read metadata
with open('gutenberg_metadata2.json') as ein:
	metadata = json.load(ein)

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
	# PATTERN 3 - verbs
	[
		{'LEMMA': 'fox'},
		{'POS': 'ADV', 'OP': '*'},
		{'POS': 'VERB'},
		{'POS': 'ADV', 'OP': '*'},
	],
	# PATTERN 4 - possessives
	[
		{'LEMMA': 'fox'},
		{'TEXT': "'", 'OP': '?'},
		{'TEXT': "'s", 'OP': '?'},
		{'POS': 'ADV', 'OP': '*'},
		{'POS': 'ADJ', 'OP': '*'},
		{'POS': 'NOUN', 'OP': '*'},
	],
	# # PATTERN 4 - sentence
	# [
	# 	{'TEXT': {'REGEX': '[\.\!\?\n]'}},
	# 	{'TEXT': {'REGEX': '[^\.\!\?\n]'}, 'OP': '*'},
	# 	{'LEMMA': 'fox'},
	# 	{'TEXT': {'REGEX': '[^\.\!\?\n]'}, 'OP': '*'},
	# 	{'TEXT': {'REGEX': '[\.\!\?\n]'}},
	# ],
	# # PATTERN 1 - adjectives
	# # add he's a ___?
	# [
	# 	{'LEMMA': 'reynard'},
	# 	{'LEMMA': 'be'},
	# 	{'POS': 'ADV', 'OP': '*'},
	# 	{'POS': 'ADJ', 'OP': '+'},
	# 	{'LEMMA': 'and', 'OP': '?'},
	# 	{'POS': 'ADV', 'OP': '*'},
	# 	{'POS': 'ADJ', 'OP': '*'},
	# ],
	# # PATTERN 2 - adjectives
	# [
	# 	{'POS': 'ADJ', 'OP': '*'},
	# 	{'LEMMA': 'and', 'OP': '?'},
	# 	{'POS': 'ADJ', 'OP': '+'},
	# 	{'LEMMA': 'reynard'},
	# ],
	# # PATTERN 3 - verbs
	# [
	# 	{'LEMMA': 'reynard'},
	# 	{'POS': 'ADV', 'OP': '*'},
	# 	{'POS': 'VERB'},
	# 	{'POS': 'ADV', 'OP': '*'},
	# ],
]
matchers = []
for pattern in patterns:
	# initiate Matcher
	matcher = Matcher(nlp.vocab)
	matcher.add('Matching', None, pattern)
	matchers.append(matcher)

# list of books to search
files = [x for x in os.listdir(DATA_PATH) if x.endswith('.txt')]
print('# files:', len(files))

# for testing
test_text = "Hello this is just some random text alrighty then let's get started. The sneaky fox was back at it again. The crafy and sneaky fox snuck into my room. The crafty, lithe, and sneaky fox is super cool. Of all the animals, his fox is the coolest one. His fox is sneaky. The fox is very crafty. The bad foxes are stupid. The fox was really really dumb. The foxes were somewhat smart and clever. Foxes are great! The sneakiest fox."
# test_text = "The sneaky fox's cubs. The sneaky foxes' cubs"

book_ids = []
starts = []
ends = []
match_types = []
matches = []

j = 0
for f in files:
	# check that it's in English
	if 'Language' in metadata[f[:-4]]:
		if 'English' not in metadata[f[:-4]]['Language']:
			print('SKIPPED - NO ENGLISH')
			continue
	
	# filepath
	f = DATA_PATH+'/'+ f
	print(f)
	
	try:
		# read in file
		ein = open(f, 'r')
		text = ein.read().strip().lower()
		ein.close()
		text = test_text
	
		# skip if fox doesn't appear in text at all
		if 'fox' not in text: 
			print('SKIPPED - NO FOX')
			continue
	
		# search for patterns
		text = nlp(text)
		for i in range(len(matchers)):
			matcher = matchers[i]
			matches_found = matcher(text)
			spans = [text[start:end] for _, start, end in matches_found]
			for span in spacy.util.filter_spans(spans):
				print((span.start, span.end, i, span.text))
				starts.append(span.start)
				ends.append(span.end)
				match_types.append(i)
				matches.append(span.text)
				book_ids.append(f)
				print('111111')
			print('2222222')
	except:
		print(f, 'ERRORRRRRRR')
	
	break
	# if j > 7: break
	# j += 1
	# print(j)
	
	# save progress
	if not j % 20:
		df = pd.DataFrame({
			'book_id': book_ids,
			'start': starts,
			'end': ends,
			'match_type': match_types,
			'match': matches,
		})
		df.to_csv('gutenberg.csv', index=False, encoding='utf-8-sig')
	j += 1


df = pd.DataFrame({
	'book_id': book_ids,
	'start': starts,
	'end': ends,
	'match_type': match_types,
	'match': matches,
})
df.to_csv('gutenberg.csv', index=False, encoding='utf-8-sig')





















