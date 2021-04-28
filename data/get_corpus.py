#!/Users/christine/anaconda3/bin/python
# -*- coding: utf-8 -*-

import os, re, json, pandas as pd, requests
from bs4 import BeautifulSoup
from nltk import word_tokenize
from itertools import chain

URL = 'http://www.gutenberg.org/ebooks/search/?query=fox&submit_search=Go'

# load page
session = requests.Session() 
response = session.get(URL, timeout=5)
soup = BeautifulSoup(response.content, 'html.parser')

page_links = []
book_links = []
metadata = {}

while True:
	# load page
	session = requests.Session()
	response = session.get(URL, timeout=5)
	soup = BeautifulSoup(response.content, 'html.parser')

	# find "next page" link
	URL = soup.findAll('a', attrs={'title': 'Go to the next page of results.'})
	if not len(URL): break
	URL = 'http://www.gutenberg.org' + URL[0].get('href')
	page_links.append(URL)
	
	# find book links
	li = soup.findAll('li', attrs={'class': 'booklink'})
	# print(li)
	for l in li:
		a = l.findAll('a')[0].get('href')
		book_links.append(a)

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

	# save .txt page
	with open('texts/{}.txt'.format(book_id), 'w') as aus:
		aus.write(str(soup))

i = 0

# download books
for book in book_links:
	print(book)
	getBook(book)
	# if i > 10: break
	# i += 1

# save as .csv
with open('metadata.json', 'w') as aus:
	json.dump(metadata, aus)























