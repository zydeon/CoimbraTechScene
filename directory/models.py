from django.db import models
from tagging.fields import TagField
from tagging.models import Tag

# Create your models here.
class Company(models.Model):
    name = models.CharField('Company name', max_length=200)
    logo = models.ImageField(upload_to='logos', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    website = models.URLField(verify_exists=False, blank=True, null=True)
    email = models.EmailField(null=True, blank=True)
    address = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    year = models.CharField('foundation year', max_length=4, blank=True, null=True)
    facebook = models.URLField(verify_exists=True, blank=True, null=True)    
    clientes = models.TextField(blank=True, null=True)
    produtos = models.TextField(blank=True, null=True)
    linkedin = models.URLField(verify_exists=True, blank=True, null=True)
    lat = models.DecimalField('latitude',max_digits=20, decimal_places=15, blank=True, null=True)
    lon = models.DecimalField('longitude', max_digits=20, decimal_places=15, blank=True, null=True)

    tags = TagField()
    
    def get_tags(self):
        return Tag.objects.get_for_object(self)

    def get_tags_names(self):
        return [t.name for t in self.get_tags()]
    
    def __unicode__(self):
        return u'%s' % self.name

class Person(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=50, blank=True, null=True)
    linkedin = models.URLField(verify_exists=True, blank=True, null=True)
    comp = models.ForeignKey(Company)

    def __unicode__(self):
        return u'%s' % self.name

