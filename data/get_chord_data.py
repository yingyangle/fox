#!/Users/christine/anaconda3/bin/python
# -*- coding: utf-8 -*-

import os, re, requests, json, pandas as pd
from collections import defaultdict, Counter


df = pd.read_csv('fables.csv')
print(df)

N = max(df['id'])
print(N)

interactions = defaultdict(lambda: defaultdict(int))

for n in range(N+1):
	characters = list(df[df.id==n]['character'])
	
	for chara in characters:
		other_charas = [x for x in characters if x != chara]
		if 'fox' in other_charas:
			other_charas = ['fox'] + [x for x in other_charas if x != 'fox']
		for oc in other_charas:
			interactions[chara][oc] += 1

# print(interactions)

df = pd.read_csv('gibbs_characters.csv')
exclude_list = ['zeus', 'hermes', 'aesop']
characters = [x for x in list(df['character']) if x not in exclude_list]
characters = characters[:12]
characters = sorted(characters)
print(characters)

interactions = {x:{y:interactions[x][y] for y in interactions[x] if y in characters} for x in interactions if x in characters}
print(interactions)

matrix = []
# characters = ['fox'] + [x for x in characters if x != 'fox']
for chara in characters:
	row = []
	for oc in characters:
		if oc not in interactions[chara]: row.append(0)
		else: row.append(interactions[chara][oc])
	matrix.append(row)
# fox_row = matrix[0]
# matrix[0] = matrix[3]
# matrix[3] = fox_row
print(matrix)

chord_data = {
	'characters': characters,
	'matrix': matrix,
	'interactions': interactions,
}
with open('chord_data.json', 'w') as aus:
	json.dump(chord_data, aus)


