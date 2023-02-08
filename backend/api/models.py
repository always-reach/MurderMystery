from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, AbstractUser
from django.db import models


# Create your models here.



class User(AbstractUser):
    pass


class GameMast(models.Model):
    title = models.CharField(verbose_name="ゲームタイトル", max_length=255, null=False, blank=False)
    auther = models.CharField(verbose_name="作者", max_length=255, null=True, blank=True)
    gm_less = models.BooleanField(verbose_name="GMレス", default=True)
    play_time_minute = models.IntegerField(verbose_name="プレイ時間", null=True, blank=True)
    max_player_count = models.IntegerField(verbose_name="最大参加人数", null=False, blank=False)
    min_player_count = models.IntegerField(verbose_name="最小参加人数", null=False, blank=False)
    note = models.TextField(verbose_name="備考", null=True, blank=True)
    image = models.ImageField(verbose_name="イメージ", upload_to="images/", null=True, blank=True)
    played_users = models.ManyToManyField(to=User, verbose_name="履修済みユーザー", related_name="played_title", blank=True)

    def __str__(self):
        return self.title
