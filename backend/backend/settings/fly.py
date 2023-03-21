from .base import *

ALLOWED_HOSTS = ["murder-mystery-kn9r26grs-always-reach.vercel.app"]

CORS_ORIGIN_WHITELIST = [
    "https://murder-mystery-kn9r26grs-always-reach.vercel.app"
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
