import pandas as pd
import folium
from folium.plugins import MarkerCluster
import random

# Read the CSV file
df = pd.read_csv('gym_data.csv')

# Remove exact duplicates
df = df.drop_duplicates(subset=['latitude', 'longitude', 'name'])

# Create a map centered on India
india_map = folium.Map(location=[20.5937, 78.9629], zoom_start=5, tiles='CartoDB Positron')

# Create a function to handle points at exact same location
def add_offset(lat, lon, coords_dict, offset=0.0005):
    """Add a small offset to coordinates that already exist in the dictionary."""
    key = f"{lat:.6f}_{lon:.6f}"
    if key in coords_dict:
        # Add a small random offset to both latitude and longitude
        new_lat = lat + random.uniform(-offset, offset)
        new_lon = lon + random.uniform(-offset, offset)
        coords_dict[key] += 1
        return new_lat, new_lon
    else:
        coords_dict[key] = 1
        return lat, lon

# Create smaller clusters for better visibility
marker_cluster = MarkerCluster(
    options={
        'maxClusterRadius': 25,  # Smaller radius for less aggressive clustering
        'disableClusteringAtZoom': 8,  # Disable clustering at higher zoom levels
    }
).add_to(india_map)

# Keep track of coordinates to avoid overlapping
coords_used = {}

# Add markers for each gym
for idx, row in df.iterrows():
    # Skip if latitude or longitude is missing
    if pd.isna(row['latitude']) or pd.isna(row['longitude']):
        continue
    
    # Apply small offset to duplicate coordinates
    adjusted_lat, adjusted_lon = add_offset(row['latitude'], row['longitude'], coords_used)
        
    # Create popup content (without rating information)
    popup_html = f"""
    <div style="width: 300px; font-family: Arial, sans-serif;">
        <h3 style="color: #333; margin-bottom: 10px;">{row['name']}</h3>
        <p><b>Address:</b> {row['address']}</p>
        <p><b>Phone:</b> {row['phone']}</p>
    """
    if not pd.isna(row['website']) and row['website']:
        popup_html += f'<p><a href="{row["website"]}" target="_blank" style="color: #0078D7;">Website</a></p>'
    if not pd.isna(row['google_maps_url']) and row['google_maps_url']:
        popup_html += f'<p><a href="{row["google_maps_url"]}" target="_blank" style="color: #0078D7;">View on Google Maps</a></p>'
    popup_html += "</div>"
    
    # Add marker to cluster with consistent icon color (blue)
    folium.Marker(
        location=[adjusted_lat, adjusted_lon],
        popup=folium.Popup(popup_html, max_width=350),
        tooltip=row['name'],
        icon=folium.Icon(color='blue', icon='info-sign')
    ).add_to(marker_cluster)

# Add a title
title_html = '''
<h3 align="center" style="font-size:20px; font-family: Arial, sans-serif;">
   <b>MMA and Combat Sports Gyms in India</b>
</h3>
'''
india_map.get_root().html.add_child(folium.Element(title_html))

# Save the map
india_map.save('mma_gyms_india.html')

print("Map created successfully! Open 'mma_gyms_india.html' in your browser to view it.")
print(f"Total gyms plotted: {len(df)}")
