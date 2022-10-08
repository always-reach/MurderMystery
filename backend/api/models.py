from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.db import models


# Create your models here.

class UsersManager(BaseUserManager):
    def create_user(self, username, email, password):
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            date_joined=timezone.now()
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        user = self.create_user(username, email, password)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(verbose_name="ユーザー名", unique=True, blank=False, null=False, max_length=150)
    password = models.CharField(verbose_name="パスワード", blank=False, null=False, max_length=128)
    email = models.EmailField(verbose_name="メールアドレス", unique=True, blank=False, null=False)
    is_active = models.BooleanField(verbose_name="ログイン可不可", default=True)
    is_staff = models.BooleanField(verbose_name="管理画面ログイン可不可", default=True)
    date_joined = models.DateTimeField(verbose_name="ログイン日時", default=timezone.now)

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "password"]

    class META:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        return str(self.__dict__)

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username

    def has_module_perms(self, app_label):
        return True

    def has_perm(self, perm, obj=None):
        return True
