from django.http import HttpResponse
from django.core.cache import cache
import requests


# class CheckIPLocationMiddleware:
#     def __init__(self, get_response, location_url: settings.IP_LOCATION_URL):
#         self.get_response = get_response
#         self.location_url = location_url
#
#     def __call__(self, request):
#         user_ip = request.META.get('HTTP_X_FORWARDED_FOR')
#         if user_ip is not None:
#             ip = user_ip.split(',')[0]
#         else:
#             ip = request.MET.get('REMOTE_ADDR')
#
#         # res = requests.get(f'{self.location_url}/{ip}')
#         db = database.Reader('./db/GeoLite2-Country.mmdb')
#         response = db.country(ip_address=ip)


class LimitRequestMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.time_window = 60   # seconds
        self.request_limit = 300

    def __call__(self, request):
        ip_address = request.META.get('REMOTE_ADDR')
        cache_key = f'ddos:{ip_address}'
        request_count = cache.get(cache_key, 0)
        request_count += 1

        if request_count >= self.request_limit:
            # Too many requests within the time window forbid the request
            return HttpResponse('Request limit exceeded')

        # Set or update the cache with the incremented request count
        cache.set(cache_key, request_count, self.time_window)

        return None
