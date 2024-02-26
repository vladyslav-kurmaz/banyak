from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


def validate_file_size(file):
    limit = 5 * 1024 * 1024

    if file.size > limit:
        raise ValidationError(_(f'File size exceeds {limit}MB'))
