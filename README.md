CoimbraTechScene
================

Directory of all of the technology companies situated in Coimbra (Portugal).

Website: [coimbratechscene.pt.vu](http://coimbratechscene.pt.vu)  
Frameworks: [Django](https://www.djangoproject.com/)

# Installation

Create a 'settings_local.py' file near CoimbraTechScene/settings.py and place the following code with the corresponding settings of your system:


    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.',     # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
            'NAME': '',                   		# Or path to database file if using sqlite3.
            'USER': '',                			# Not used with sqlite3.
            'PASSWORD': '',                  	# Not used with sqlite3.
            'HOST': '',                      	# Set to empty string for localhost. Not used with sqlite3.
            'PORT': '',                      	# Set to empty string for default. Not used with sqlite3.
        }
    }
    
    MEDIA_ROOT = '/PATH/TO/REPO/CoimbraTechScene/media'       # included from 
    
    TEMPLATE_DIRS = (
        # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
        # Always use forward slashes, even on Windows.
        # Don't forget to use absolute paths, not relative paths.
        '/PATH/TO/REPO/CoimbraTechScene/directory/templates',
    )
    
    STATIC_ROOT = '/PATH/TO/REPO/CoimbraTechScene/directory/static'
    
