#!/Users/christine/anaconda3/bin/python
# -*- coding: utf-8 -*-

import os, re, json, pandas as pd, requests
from bs4 import BeautifulSoup
from nltk import word_tokenize
from itertools import chain

BASE_URL = 'http://www.gutenberg.org'
URL = 'http://www.gutenberg.org/ebooks/search/?query=fox&submit_search=Go'

queries = [
	'fox',
	'fable',
	'folklore',
	'myth',
	'animal',
	'biology',
	'nature',
	'medieval',
	'classical',
]

subject_links = []
subjects = []
page_links = []
book_links = []
metadata = {}

# get subject links for a given query
def getSubjects(query):
	# get subjects
	URL = 'http://www.gutenberg.org/ebooks/subjects/search/?query='+str(query)
	# load page
	session = requests.Session()
	response = session.get(URL, timeout=5)
	soup = BeautifulSoup(response.content, 'html.parser')
	# get subject links
	li = soup.findAll('li', attrs={'class': 'navlink'})
	for l in li:
		a = l.findAll('a')[0].get('href')
		if 'sort_order' in a: continue
		subject_links.append(a)
		span = l.findAll('span', attrs={'class': 'title'})[0].getText()
		subjects.append(span)
		print(a, span)
	return

# get book links from subject/query url
def getBookLinks(SUBJECT_URL):
	URL = BASE_URL + SUBJECT_URL
	# for each page of books
	while True:
		# load page
		session = requests.Session()
		response = session.get(URL, timeout=5)
		soup = BeautifulSoup(response.content, 'html.parser')
		print(URL)

		# find "next page" link
		URL = soup.findAll('a', attrs={'title': 'Go to the next page of results.'})
		if not len(URL): break
		URL = BASE_URL + URL[0].get('href')
		page_links.append(URL)
	
		# find book links
		li = soup.findAll('li', attrs={'class': 'booklink'})
		# print(li)
		for l in li:
			a = l.findAll('a')[0].get('href')
			book_links.append(a)
	return

# download book at a given book link
def getBook(book_link):
	URL = 'http://www.gutenberg.org'+str(book_link)
	
	# load page
	session = requests.Session() 
	response = session.get(URL, timeout=5)
	soup = BeautifulSoup(response.content, 'html.parser')
	
	# book info table
	table = soup.findAll('table')[-1]
	
	# get table rows
	th = table.findAll('th')
	th = [x.getText().strip() for x in th]
	td = table.findAll('td')
	td = [x.getText().strip() for x in td]
	
	# book info dict
	d = {th[i]:td[i] for i in range(len(th))}
	
	# add to metadata
	book_id = d['EBook-No.']
	metadata[int(book_id)] = d
	
	# load .txt page
	dl = soup.findAll('a', string='Plain Text UTF-8')
	if not len(dl): return
	dl = 'http://www.gutenberg.org' + dl[0].get('href')
	session = requests.Session() 
	response = session.get(dl, timeout=5)
	soup = BeautifulSoup(response.content, 'html.parser')
	if 'fox' not in str(soup).lower():
		print('SKIPPED')
		return

	# save .txt page
	with open('texts/{}.txt'.format(book_id), 'w') as aus:
		aus.write(str(soup))
	
	return


#### EXECUTE ####

# get subject links
for query in queries:
	getSubjects(query)

# get book links
for subject_link in subject_links:
	getBookLinks(subject_link)

print(subjects, len(subjects))
print(book_links, len(book_links))

# download books
i = 0
for book in book_links:
	print(book)
	getBook(book)
	# if i > 10: break
	# i += 1

# save as .csv
with open('gutenberg_metadata.json', 'w') as aus:
	json.dump(metadata, aus)








