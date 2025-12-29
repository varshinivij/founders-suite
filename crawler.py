import requests 
from bs4 import BeautifulSoup

MAX_DEPTH = 10 

#Extract links given a frontier of web pages
def extract_links(frontier:list) -> list:
    urls = []
    depth = 0
    while depth < MAX_DEPTH and frontier:
        try: 
            url = urls.pop(0)
            response = requests.get(url)
            if response.status_code != 200:
                raise Exception("Invalid response")
            html_doc = response.text
            soup = BeautifulSoup(html_doc, 'html.parser')
            link_elements = soup.select("a[href]") 
            #we only extract the a html tags that have a reference attribute 
            #example: <a href="">

            urls = set() #prevent exact duplicates

            for link_el in link_elements:
                raw_url = link_el["href"]
                urls.append(absolute_url(raw_url))
            
            depth += 1
            
        except Exception as e:
            print(f"Error: {e}")

#Convert a raw url to an absolute url
def absolute_url(raw_url):
    


if __name__ == "__main__":
    #extract_links(["https://www.w3schools.com/html/html_examples.html"])
    # Import Beautiful Soup

    # Initialize the object with a HTML page
    soup = BeautifulSoup('''
        
            <h1 class="hello"> Heading 1 </h1>
            <h1 class="welcome"> Heading 2 </h1>
        
        ''', "html.parser")

    # Get the whole h2 tag
    tag = soup.select("h1")

    # Get the attribute
    #attribute = tag.attrs

    # Print the output
    print(tag)