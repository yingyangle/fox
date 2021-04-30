#!/Users/christine/anaconda3/bin/python
# -*- coding: utf-8 -*-

import os, re, requests, json, pandas as pd
from bs4 import BeautifulSoup
from nltk import word_tokenize
from itertools import chain
from collections import Counter
from nltk.stem import WordNetLemmatizer

lem = WordNetLemmatizer()

URL = 'http://mythfolklore.net/aesopica/oxford/index.htm'

# load page
session = requests.Session() 
response = session.get(URL, timeout=5)
soup = BeautifulSoup(response.content, 'html.parser')

ids = []
links = []
titles = []

# find headings/ categories
a = soup.findAll('a')

# get fable titles, links, and id numbers
for link in a:
	ids.append(link.getText())
	links.append(link.get('href'))
	title = link.next_sibling
	if title: 
		title = re.sub("'", '', title).strip().lower()
		title = re.sub('\ufdd3', '-', title)
	titles.append(title)

# save to df
df = pd.DataFrame({
	'id': ids,
	'title': titles,
	'link': links,
})
# only keep rows where id contains "Fable"
df = df[df['id'].str.contains('Fable')]
# only keep id number, remove "Fable" part
df['id'] = [re.search('\d+', x)[0] for x in df['id']]
# add full links
df['link'] = ['http://mythfolklore.net/aesopica/oxford/'+x for x in df['link']]

# get characters from titles
stops = ['the', 'a', 'and', 'his', 'her', 'their', 'at', 'in', 'on', 'to', 'go', 'of', 'two', 'old', 'by', 'young', 'as', 'one', 'with', ',', "'", '’', 's', "'s", "’s"]
replace_dict = {
	'farmer': 'man',
	'shepherd': 'man',
}
characters = [word_tokenize(x) for x in df['title']]
characters = [[replace_dict[lem.lemmatize(c)] if c in replace_dict else lem.lemmatize(c) for c in x if c not in stops] for x in characters]
df['characters'] = characters

ids = list(df['id'])
titles = list(df['title'])
links = list(df['link'])

# save as .csv
df.to_csv('gibbs.csv', index=False, encoding='utf-8-sig')


# show character frequency
characters_all = list(chain.from_iterable(characters))
count = Counter(characters_all)
# save as .csv
df = pd.DataFrame({
	'character': [x[0] for x in count.most_common()],
	'occurrence': [x[1] for x in count.most_common()],
})
df.to_csv('gibbs_characters.csv', index=False, encoding='utf-8-sig')

# create .csv with characters for each fable and blank col for actions
ids_new = []
titles_new = []
links_new = []
characters_new = []
for i in range(len(characters)):
	n = len(characters[i])
	ids_new.extend([ids[i]] * n)
	titles_new.extend([titles[i]] * n)
	links_new.extend([links[i]] * n)
	characters_new.extend(characters[i])
df = pd.DataFrame({
	'id': ids_new,
	'title': titles_new,
	'link': links_new,
	'character': characters_new,
	'actions': [0] * len(ids_new)
})
df.to_csv('fables.csv', index=False, encoding='utf-8-sig')




















