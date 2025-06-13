import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.pyplot import figure
import numpy as np

# Read the CSV file
df = pd.read_csv('gym_data.csv')

# Create a figure with a large size
plt.figure(figsize=(15, 12))

# Load the India map image
img = plt.imread('india_map.png') 

# Set the extent of the India map (approximate coordinates)
# [longitude_min, longitude_max, latitude_min, latitude_max]
extent = [68, 98, 6, 38]

# Display the map
plt.imshow(img, extent=extent)

# Add points for each gym location
plt.scatter(df['longitude'], df['latitude'], c='red', s=50, alpha=0.7)

# Add a title
plt.title('MMA and Combat Sports Gyms in India', fontsize=16)

# Add labels for cities with more than 5 gyms
city_counts = df['city'].value_counts()
cities_with_many_gyms = city_counts[city_counts > 5].index.tolist()

for city in cities_with_many_gyms:
    city_df = df[df['city'] == city]
    # Calculate the mean position for the city label
    mean_lat = city_df['latitude'].mean()
    mean_lon = city_df['longitude'].mean()
    plt.text(mean_lon, mean_lat, city, fontsize=12, ha='center')

# Set axis labels
plt.xlabel('Longitude')
plt.ylabel('Latitude')

# Add a grid
plt.grid(alpha=0.3)

# Save the map
plt.savefig('mma_gyms_map.png', dpi=300, bbox_inches='tight')
plt.close()

print("Map saved as 'mma_gyms_map.png'")
