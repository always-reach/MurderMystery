from django.contrib import admin
from .models import Game, User


# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass


@admin.register(Game)
class GameÏAdmin(admin.ModelAdmin):
    pass
