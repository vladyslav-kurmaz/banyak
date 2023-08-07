from google.auth.transport import requests
from google.oauth2 import id_token


class Google:

    @staticmethod
    def validate(self, auth_token):
        try:
            id_info = id_token.verify_oauth2_token(
                auth_token, requests.Request()
            )

            if 'account.google.com' in id_info['iss']:
                return id_info
        except:
            return 'Token invalid'
