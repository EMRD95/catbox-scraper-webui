# Catbox Scraper Webui

**Note:** The original Python-based scraper no longer works reliably due to the implementation of rate limit on Catbox.  
This repo just contains a youtube shorts like webui to show catbox videos you found.

**Demo:**  
[https://emrd95.github.io/catbox-scraper-webui/](https://emrd95.github.io/catbox-scraper-webui/)

Run with **python -m http.server** and access at [http://localhost:8000/index.html](http://localhost:8000/index.html)

## Old Setup (No Longer Maintained)

An extremely fast python script for scraping and downloading random files from [Catbox](https://catbox.moe), a file-hosting site with a basic webui to browser them.

The script takes from file extensions specified under config.yaml, generates random urls and checks to see if they are valid. If they are, it put the URLs in valids.txt that you can browser later with the webui. The script doesn't download anything to save bandwidth and go faster, if you wish to download all files, use [the original repo](https://github.com/dootss/catbox-scraper).

![image](https://github.com/EMRD95/catbox-scraper-webui/assets/114953576/6b113033-5f8a-4665-8b14-a5711f70d75d)

`https://files.catbox.moe/[a-z0-9]{6}.(extension)` is the format for URL generation.

## Demonstration
https://github.com/dootss/catbox-scraper/assets/126783585/c0213d13-01ec-4a55-80cd-1e877b081530

## Installation and Usage
You will need:
- Python
- Git
- npm (optional for webui)
```
git clone https://github.com/dootss/catbox-scraper.git
cd catbox-scraper
pip install -r requirements.txt
python main.py
```
the script will gather links.

Press CTRL+C to stop the script.

To set up the webui

```
npm init -y
npm install express cors
node app.js
```

## Configuration
If you wish to change the extensions the script attempts to check for, simply edit `config.yaml`'s `file_extensions` field with the extensions you wish to check for:

![image](https://github.com/dootss/catbox-scraper/assets/126783585/726ebad4-9fa9-4807-bafe-28f3867c6949)

By default, the script checks for the following: `png, gif, jpg, jpeg, webm, mp4`

## NOTICE
*I am not responsible for any consequences that come from using this script! Catbox is a file hosting site, and files found on it can be unpredictable. You'll definitely find a LOT of NSFW images as a result of running this.


