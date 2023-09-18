from rest_framework import pagination


class CustomPaginate(pagination.PageNumberPagination):
    max_page_size = 25
