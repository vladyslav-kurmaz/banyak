from django.utils.encoding import force_bytes
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from ..token import token_generator


def verify(user, request):
    token = token_generator.make_token(user)
    user_id = urlsafe_base64_encode(force_bytes(user.id))

    current_site = get_current_site(request=request).domain
    relative_link = reverse('email-verify', kwargs={'token': token, 'user_id': user_id})
    absolute_url = 'http://' + current_site + relative_link
    data = {
        'url': absolute_url
    }
    return data
