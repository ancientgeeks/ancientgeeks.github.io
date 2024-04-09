import os
import re

# Define the directory where the HTML files are located
html_dir = './pages'

# Define the regex patterns for image, script, and CSS references
# These patterns now only match relative paths (i.e., paths that don't start with 'http')
# The image pattern now matches .png, .jpg, .jpeg, .gif, .svg, and .webp files
img_pattern = re.compile(r'src="((?!http)[^"]*(.png|.jpg|.jpeg|.gif|.svg|.webp))"')
script_pattern = re.compile(r'src="((?!http)[^"]*.js)"')
css_pattern = re.compile(r'href="((?!http)[^"]*.css)"')

# Go through each file in the directory
for filename in os.listdir(html_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(html_dir, filename)

        # Read the file
        with open(filepath, 'r') as file:
            filedata = file.read()

        # Update image references
        filedata = img_pattern.sub(r'src="../images/\1"', filedata)

        # Update script references
        filedata = script_pattern.sub(r'src="../scripts/\1"', filedata)

        # Update CSS references
        filedata = css_pattern.sub(r'href="../styles/\1"', filedata)

        # Write the file out again
        with open(filepath, 'w') as file:
            file.write(filedata)