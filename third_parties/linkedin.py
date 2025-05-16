import json
import os

import requests
from dotenv import load_dotenv

load_dotenv()


def scrape_linkedin_profile(linkedin_profile_url: str, mock: bool = False):
    """scrape information from LinkedIn profiles,
    Manually scrape the information from the LinkedIn profile"""

    if mock:
        # read from /mock/linkedin_phillippbertram.json
        with open("mock/linkedin_phillippbertram.json", "r") as f:
            return json.load(f)
    
    api_key = os.environ["PROXYCURL_API_KEY"]
    headers = {"Authorization": "Bearer " + api_key}
    api_endpoint = "https://nubela.co/proxycurl/api/v2/linkedin"
    params = {
        'linkedin_profile_url': linkedin_profile_url,
    }
    response = requests.get(api_endpoint,
                            params=params,
                            headers=headers)

    return response.json()


if __name__ == "__main__":
    print(
        scrape_linkedin_profile(
            linkedin_profile_url="https://www.linkedin.com/in/phillipp-bertram/",
            mock=True,
        ),
    )
