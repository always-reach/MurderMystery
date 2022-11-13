from django.contrib import admin
from .models import GameMast
# Register your models here.

@admin.register(GameMast)
class GameMastAdmin(admin.ModelAdmin):
    pass