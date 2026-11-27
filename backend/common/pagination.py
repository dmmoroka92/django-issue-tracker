from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class ApiPageNumberPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = "page_size"
    max_page_size = 25

    def get_paginated_response(self, data) -> Response:
        page = self.page

        if page is None:
            raise RuntimeError("Pagination has not been initialized")

        return Response(
            {
                "results": data,
                "total": page.paginator.count,
                "pagination": {
                    "current_page": page.number,
                    "page_size": page.paginator.per_page,
                    "total_pages": page.paginator.num_pages,
                    "next_page": (page.next_page_number() if page.has_next() else None),
                    "previous_page": (
                        page.previous_page_number() if page.has_previous() else None
                    ),
                },
            }
        )
