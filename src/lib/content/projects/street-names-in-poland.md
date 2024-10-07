---
templateKey: work-item
title: Street names in Poland
date: 2024-06-23T20:01:00.000Z
image: /assets/streets.png
description: The most common street names in Poland
type: map
---
This map was simple to create but it was more difficult to obtain the data for it.

I downloaded the streets data from the polish Main Office of Geodesy and Cartography. I had sheets with thousands of rows containing street data for each voivideship (first level of adminsitration vision in Poland). 

To count the number of each street for each region I wrote simple but dirty Python script. 

It might be easier using library like Pandas but for such small task I decided not to use any external libraries.

Nothing special but with this script I managed to create this map in two hours.

Here's the script:

```python
import csv
import os

csvDir = os.listdir(r"path_to_directory_with_csv_files\test")
pathBase = r"path_to_main_project_directory\dane"
directory = r"path_to_directory_with_csv_files\test"

def writeCsv(name):
    with open(pathBase + '/test/' + name + '.csv') as csvInput, open(pathBase + '/result' + r'\edited_' + name + '.csv', 'w', newline='') as csvOutput:
        reader = csv.reader(csvInput, delimiter=';')
        writer = csv.writer(csvOutput, delimiter=';')
        streets = []
        streetsCount = {}

        for row in reader:
            column = list(row[i] for i in [7, 8])
            streets.append((f'{column[1]} {column[0]}').strip())

        for street in streets:
            if street in streetsCount:
                streetsCount[street] += 1
            else:
                streetsCount[street] = 1

        for key in streetsCount:
            writer.writerow([key, streetsCount[key]])

for file in csvDir:
    filename = os.path.splitext(file)[0]
    writeCsv(filename)
```
