import requests 
from bs4 import BeautifulSoup

MAX_DEPTH = 10 

def extract_links(frontier:list) -> list:
    urls = []
    while depth < MAX_DEPTH and frontier:
        try: 
            url = urls.pop(0)
            response = requests.get(url)
            if response.status_code != 200:
                raise Exception("Invalid response")
            html_doc = response.text
            soup = BeautifulSoup(html_doc, 'html.parser')
            link_elements = soup.select("a[href]") 
            print(link_elements)
            #we only extract the a html tags that have a reference attribute 
            #example: <a href="">
        except:
            print("hi")

def absolute_url(raw_urls):
    for i in range(len(raw_urls)):
        url = raw_urls[i]["href"]

if __name__ == "__main__":
    #extract_links(["https://www.w3schools.com/html/html_examples.html"])
    # Import Beautiful Soup

    # Initialize the object with a HTML page
    soup = BeautifulSoup('''
        
            <h2 class="hello"> Heading 1 </h2>
            <h1> Heading 2 </h1>
        
        ''', "lxml")

    # Get the whole h2 tag
    tag = soup.h2

    # Get the attribute
    attribute = tag.attrs

    # Print the output
    print(attribute)