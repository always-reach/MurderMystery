from django.contrib import admin
from .models import GameMast, User


# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass
@admin.register(GameMast)
class GameMastAdmin(admin.ModelAdmin):
    pass