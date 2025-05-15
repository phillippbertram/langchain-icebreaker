# Ice Breaker

Ice Breaker is a web application that crawls LinkedIn and Twitter data about a person to generate personalized ice breakers for networking and outreach.

---

## Features

- Scrapes LinkedIn and Twitter profiles for public data
- Uses AI to craft custom ice breakers based on the gathered information
- Integrates with OpenAI, Scrapin.io, and Twitter APIs

---

## Prerequisites

Before running the project, ensure you have the following API keys and environment variables set in a `.env` file:

```
OPENAI_API_KEY
SCRAPIN_API_KEY
TAVILY_API_KEY
TWITTER_API_KEY
TWITTER_API_SECRET
TWITTER_ACCESS_TOKEN
TWITTER_ACCESS_SECRET
LANGCHAIN_TRACING_V2
LANGCHAIN_API_KEY
LANGCHAIN_PROJECT # Optional
```

> **Note:**
>
> - This project uses paid API services:
>
>   - [Scrapin.io](https://www.scrapin.io)
>   - Twitter API (paid)
>
> - If you enable tracing (`LANGCHAIN_TRACING_V2=true`), you must provide a valid `LANGCHAIN_API_KEY`. Without it, the app will throw an error. If you don't need tracing, omit or comment out these variables.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/phillippbertram/langchain-icebreaker.git
cd langchain-icebreaker
```

### 2. Install Dependencies

```bash
pipenv install
```

### 3. Start the Flask Server

```bash
pipenv run python app.py
```

---

## Running Tests

To execute the test suite, run:

```bash
pipenv run pytest .
```

---

## License

[MIT](LICENSE)

---
