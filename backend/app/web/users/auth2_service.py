from app.exception.custom import CustomException
import aiohttp
from app.settings import settings


class Auth2:
    def __init__(self):
        pass

    async def get_email(self, access_token):
        url = f'https://login.microsoftonline.com/{settings.vite_tenant_id}/v2.0/.well-known/openid-configuration'
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as endpoint_response:
                if endpoint_response.status != 200:
                    print("$$" * 10)
                    print(endpoint_response.content)
                    print("$$" * 10)
                    raise CustomException(endpoint_response.reason)

                endpoint_response = await endpoint_response.json()
                token_endpoint_url = endpoint_response.get('token_endpoint')
                data = {
                    "grant_type": "authorization_code",
                    "code": access_token,
                    "redirect_uri": settings.vite_redirect_url,
                    "client_id": settings.vite_client_id,
                    "client_secret": settings.vite_client_secret
                }
                async with session.post(token_endpoint_url, data=data) as jwt_token_response:
                    if jwt_token_response.status != 200:
                        print("**"*10)
                        print(jwt_token_response.content)
                        print("**" * 10)
                        raise CustomException(jwt_token_response.reason)

                    jwt_token_response = await jwt_token_response.json()
                    user_profile_url = f'https://graph.microsoft.com/v1.0/me'
                    header = {
                        "Authorization": f"Bearer {jwt_token_response.get('access_token')}"
                    }
                    async with session.get(user_profile_url, headers=header) as user_profile_response:
                        if user_profile_response.status != 200:
                            print("##" * 10)
                            print(user_profile_response.content)
                            print("##" * 10)
                            raise CustomException(user_profile_response.reason)

                        user_profile_response = await user_profile_response.json()
                        return user_profile_response.get('userPrincipalName').split("#")[0]
