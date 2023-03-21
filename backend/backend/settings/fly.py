from .base import *

ALLOWED_HOSTS = ["murder-mystery-blue.vercel.app"]

CORS_ORIGIN_WHITELIST = [
    "https://murder-mystery-blue.vercel.app"
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'murder_mystery',
        'USER': 'postgres',
        'PASSWORD': 'hOSxEaPzPl2Dkem',
        'HOST': 'murder-mystery-db.internal',
        'PORT': 5432,
    }
}
