"""
Django settings for investorservitude project.

Generated by 'django-admin startproject' using Django 1.9.5.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os
import cbs
import dj_database_url

cbs.DEFAULT_ENV_PREFIX = 'DJANGO_'


class BaseSettings:
    # Build paths inside the project like this: os.path.join(BASE_DIR, ...)
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # Quick-start development settings - unsuitable for production
    # See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

    # SECURITY WARNING: don't run with debug turned on in production!
    DEBUG = False

    ALLOWED_HOSTS = ['harvey.jadedraver.club']

    # Application definition

    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'core',
    ]

    MIDDLEWARE_CLASSES = [
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ]

    ROOT_URLCONF = 'investorservitude.urls'

    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]

    WSGI_APPLICATION = 'investorservitude.wsgi.application'

    # Password validation
    # https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

    AUTH_PASSWORD_VALIDATORS = [
        {
            'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
        },
    ]

    # Internationalization
    # https://docs.djangoproject.com/en/1.9/topics/i18n/

    LANGUAGE_CODE = 'en-us'

    TIME_ZONE = 'UTC'

    USE_I18N = True

    USE_L10N = True

    USE_TZ = True

    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/1.9/howto/static-files/

    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'static')

    @cbs.env
    def SECRET_KEY(self):
        """Gets its value from os.environ['DJANGO_SECRET']"""
        return 'my-not-so-secret-key'

    @cbs.env
    def DATABASE_DEFAULT(self):
        return 'postgres://localhost:5432/investorservitude'

    # Database
    # https://docs.djangoproject.com/en/1.9/ref/settings/#databases

    @property
    def DATABASES(self):
        return {
            'default': dj_database_url.parse(self.DATABASE_DEFAULT)
        }

    @cbs.env
    def INVESTORSERVE_URL(self):
        return 'https://www.investorserve.com.au'

    @cbs.env
    def INVESTORSERVE_USERNAME(self):
        return 'set-this-in-environment'

    @cbs.env
    def INVESTORSERVE_PASSWORD(self):
        return 'set-this-in-environment'


class LocalSettings(BaseSettings):
    DEBUG = True

    @property
    def INSTALLED_APPS(self):
        return super().INSTALLED_APPS + [
            'django_extensions',
        ]


# Invoke the settings using the DJANGO_MODE environment variable
MODE = os.environ.get('DJANGO_MODE', 'Local')
cbs.apply('{}Settings'.format(MODE.title()), globals())
