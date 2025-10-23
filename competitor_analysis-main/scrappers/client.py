import os
from typing import List
from langchain_community.document_loaders import AsyncChromiumLoader
from langchain_community.document_transformers import BeautifulSoupTransformer
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains import LLMChain
from langchain_openai import AzureChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

llm = AzureChatOpenAI(
    azure_deployment="uom-model",
    api_version="2025-01-01-preview"
)

strategy_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a marketing strategist. Based on the provided client information and input text, generate concise (max 300 words), actionable content strategy recommendations. Use relevant examples from the input when possible. Format your response in clear, readable Markdown. Keep responses short and to the point."),
    ("human", "{input}")
])

strategy_chain = LLMChain(llm=llm, prompt=strategy_prompt)

async def scrape_articles(urls: List[str]) -> str:
    loader = AsyncChromiumLoader(urls)
    docs = await loader.aload()
    bs_transformer = BeautifulSoupTransformer()
    transformed_docs = bs_transformer.transform_documents(docs, tags_to_extract=["span", "p", "div"])
    splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(chunk_size=1000, chunk_overlap=0)
    chunks = splitter.split_documents(transformed_docs)
    return "\n\n".join(chunk.page_content for chunk in chunks)

async def generate_strategy(client_info: dict, urls: List[str]) -> str:
    print("🔍 Scraping URLs:", urls)
    combined_content = await scrape_articles(urls)

    combined_input = (
        f"Client Info:\n{client_info}\n\n"
        f"Competitor Content:\n{combined_content}"
    )

    print("🧠 Generating strategy with LLM...")
    return strategy_chain.run({"input": combined_input})

def generate_strategy_from_posts(client_info, post_captions):
    input_text = (
        f"Client Info:\n{client_info}\n\n"
        f"Recent Instagram Post Captions:\n"
        + "\n\n".join(post_captions)
    )

    strategy = strategy_chain.run({"input": input_text})
    return strategy
