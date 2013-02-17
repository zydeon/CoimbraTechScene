from django.shortcuts import render_to_response
from directory.models import Company
from django.template import RequestContext
import sys
from django.core import serializers
from django.http import HttpResponse
from tagging.models import Tag, TaggedItem


def index(request):
	tags = [x.name for x in Tag.objects.all()]

	# alphabet division 
	alphabet_divisions = [ ['A','B','C','D'],
						   ['E','F','G','H'],
						   ['I','J','K','L'],
						   ['M','N','O','P'],
						   ['Q','R','S','T'],
						   ['U','W','V','Y','X','1','2','3','4','5','6','7','8','9','Z'] ]	

	all_companies = Company.objects.all().exclude(lat=None).exclude(lon=None)

	# company
	companies_by_name = [ {'division':A[0]+'-'+A[-1], 'companies':all_companies.filter(name__regex=build_regex(A)).order_by('name') } for A in alphabet_divisions ]

	companies_by_tags = [ {'tag':T, 'companies': TaggedItem.objects.get_by_model(Company, [T]).order_by('name') } for T in tags ]

	# companies locations
	companies = [ {'name':a.name, 'lat':a.lat, 'lon':a.lon } for a in all_companies ]

	return render_to_response('index.html', {
											'companies_by_name' : companies_by_name,
											'companies_by_tags' : companies_by_tags,
											'companies' : companies
											 },
								context_instance=RequestContext(request));


def get_company(request):
	name = request.GET['name']
	c = Company.objects.filter(name=name)
	data = serializers.serialize("json", c)
	return HttpResponse(data)


### Just helper functions
def build_regex(alph_division):
	reg = '^('
	for letter in alph_division:
		if letter == alph_division[-1]:
			reg += letter+'|'+letter.lower()+').*$'
		else:
			reg += letter+'|'+letter.lower()+'|'
	return reg
