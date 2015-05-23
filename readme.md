# Introduction

I chose this dataset primarily because I wanted something similar to what was taught in the classes, I wanted something to display based on countries and something to compare between countries. Another reason I chose this is because up until now, I knew little to nothing about global emission and greenhouse gases and I hoped after this, I'd at least be able to have a conversation on it.

I originally was interested in seeing how much different countries contribute to the global emissions over time relative to their population, the original plan was to be able to click on a country and then draw a table underneath showing the country's emissions data. I ultimately decided to explore this area of thinking more in the EDA with R project and use the same dataset there instead. Wrangling the data was a bit of a challenge and the first problem I encountered was the example used in the classes used circles to represent the number of people attending, I used circles at first to represent both the emissions yearly and population but decided colouring the countries themselves would be much better, it was a bit of a challenge getting the colours on the maps directly, in the world cup examples used, the data itself was bound to the circles and the circle size could easily be based on information from the data, the problem I encountered with using this method was since I had to colour the paths, the data already bound to the paths was the geojson data, I eventually got past this however. Another problem encountered was with the numerical to categorical scale to convert emissions numerical values to a colour, luckily I found a Mike Bostock tutorial page showing how this could be done.

There are 3 html files included, there have been 2 iterations with index3.html being the final iteration and emissions1.csv is the final version of data used.

### Design
I initially had circles on the maps but based on feedback changed to coloring the countries directly based on emissions. The main reason I chose using a map as opposed to say a graph is to convey the idea that particular areas, continents in the world are emitting more than others and this can be clearly seen on a map. 

### Feedbacks

#####Feedback 1 (Feedback from a friend)
Initial plot index1.html 
Initially, I thought it a good idea to use circles to depict both the population changes as well as the amount of emissions. My friend felt like the circles for the most part distracted from the data, and also changes in population and emissions over the years weren't so drastic to register in the animation/transition except for when comparing years far from each other. He also suggested showing the country names especially when hovered over.

#####Feedback 2 (comments made by my Niece)

I showed the plot to my 16year old niece who recently had to write an essay on global warming. 

She felt like the visualization would be better served if I coloured in reds as opposed to green, she said she understood my choice of the colour green because of greenhouse gases, however, white to red she felt would better convey the urgency of the colour and the severity of emissions and also suggested not waiting till the end of the initial year update to show the legend and also general ranges rather than displaying actual numbers for the ranges for example "under 70,000" rather than "4 - 69177 Kilotonnes".


#####Feedback 3

This friend suggested using a slider for the years instead of buttons and fixing Canada's label so the tooltip shows it. 

#####Feedback 4 (Udacity Evaluator)
The evaluator suggested removing feedback 3 chat, having the md file better formatted, showing fewer years in the animation, adding a replay button and displaying how emissions have changed for each country as the years change.

#####Resonse to feedbacks
I changed from the circles to colour the maps instead as the circles distracted from the data 
I decided to go with colour green instead of red simply because of the phrase "greenhouse gas", while red would have conveyed the urgency more, green I felt did a better job of staying with the theme.
I updated the legend to show from during the animation rather than at the end of it.
I changed the legend text to be more human readable rather than showing the actual number scale
The slider I plan to implement as part of the changes I plan to make to the visualization as I work on it in the future.
The simply zoomed out of the visualization to show Canada's label.
The animation now jumps every 10 years instead of every year, this allows the viewer to see more vividly the changes without the distraction of going through so many years.
The tooltip now shows how much emissions has risen or dropped compared to the first year for all countries for all the years.
Both the css and js code are now in their own files.

### Resources

www.gapminder.com
databank.worldbank.org
http://bl.ocks.org/mbostock/5577023
http://eyeseast.github.io/visible-data/2013/08/27/responsive-legends-with-d3/
http://eyeseast.github.io/visible-data/2013/08/26/responsive-d3/
http://bl.ocks.org/Caged/6476579
http://www.recursion.org/d3-for-mere-mortals/
http://www2.le.ac.uk/offices/ld/resources/numerical-data/percentages

### Data Narrative
The key takeaway from this visualization has been that has the years have gone by, most countries have contributed more to global emissions.
