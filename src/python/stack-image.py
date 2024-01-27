from PIL import Image, ImageDraw
import sys
import collections
import math
import numpy as np

def compute_mean_color(image):
    pixels = list(image.getdata())
    mean_color = (
        sum([pixel[0] for pixel in pixels]) // len(pixels),
        sum([pixel[1] for pixel in pixels]) // len(pixels),
        sum([pixel[2] for pixel in pixels]) // len(pixels)
    )
    return mean_color

def crop_transparent(image):
    # Get the alpha channel from the image
    alpha = image.split()[3]

    # Get the bounding box of non-transparent pixels
    bbox = alpha.getbbox()

    # Crop the image to the bounding box
    cropped_image = image.crop(bbox)

    return cropped_image

def apply_transparency_threshold(image, threshold):
    # Ensure the image has an alpha channel
    image = image.convert("RGBA")

    # Get pixel data
    pixels = image.getdata()

    # Apply transparency threshold
    new_pixels = [(r, g, b, 0) if a < threshold else (r, g, b, a) for r, g, b, a in pixels]

    # Create a new image with the modified pixel data
    new_image = Image.new("RGBA", image.size)
    new_image.putdata(new_pixels)

    return new_image

def color_distance(color1, color2):
    # Calculate Euclidean distance between two colors
    return np.linalg.norm(np.array(color1) - np.array(color2))

def compute_top_colors(image, num_colors=5, distance_margin=20):
    pixels = list(image.getdata())

    # Filter out transparent colors (alpha channel is not 0)
    pixels = [color for color in pixels if color[3] != 0]

    counter = collections.Counter(pixels)

    # Group similar colors and keep the most common one
    grouped_colors = {}
    for color, count in counter.items():
        added_to_group = False
        for group_color in grouped_colors:
            if color_distance(color, group_color) < distance_margin:
                # Colors are within the distance margin, add to the group
                grouped_colors[group_color] += count
                added_to_group = True
                break

        if not added_to_group:
            # Create a new group
            grouped_colors[color] = count

    # Sort the grouped colors by count in descending order
    sorted_colors = sorted(grouped_colors.items(), key=lambda x: x[1], reverse=True)

    # Take the top colors up to the specified num_colors
    top_colors = [color for color, _ in sorted_colors[:num_colors]]

    return top_colors

def create_hexagon_vertices(canvas_size):
    # Calculate hexagon properties
    hexagon_side = min(canvas_size[0] // 2, canvas_size[1] // 2)
    center_x, center_y = canvas_size[0] // 2, canvas_size[1] // 2

    # Calculate hexagon vertices
    hexagon_vertices = []
    for i in range(6):
        angle = (2.0 * math.pi * i / 6) + (math.pi / 2)  # Shift the starting angle by pi/2
        x = center_x + hexagon_side * math.cos(angle)
        y = center_y + hexagon_side * math.sin(angle)
        hexagon_vertices.append((x, y))

    return hexagon_vertices

def angle_to_points(angle):
    # Convert angle to radians
    angle_rad = np.radians(angle)
    
    # Calculate the points on the unit circle using trigonometry
    x1, y1 = np.cos(angle_rad), np.sin(angle_rad)
    x2, y2 = np.cos(angle_rad + np.pi), np.sin(angle_rad + np.pi)
    
    return np.array((x1, y1)), np.array((x2, y2))

def create_linear_gradient(canvas_size, poly, c1, c2, cover_opacity=0.1):

    # Draw initial polygon, alpha channel only, on an empty canvas of image size
    canvas = Image.new('RGBA', canvas_size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    draw.polygon(poly, fill=(0, 0, 0, 255), outline=None)
    
    # canvas = canvas.crop(canvas.getbbox())
    size = min(canvas.size)

    # Create gradient from color 1 to 2 of appropriate size
    gradient = np.linspace(c1, c2, size, True).astype(np.uint8)
    gradient = np.tile(gradient, [2 * size, 1, 1])
    gradient = Image.fromarray(gradient)

    # Paste gradient on blank canvas of sufficient size
    temp = Image.new('RGBA', (max(canvas.size[0], gradient.size[0]),
                              max(canvas.size[1], gradient.size[1])), (0, 0, 0, 0))
    
    temp.paste(gradient)
    gradient = temp

    # Paste gradient on temporary image
    canvas.paste(gradient.crop((0, 0, canvas.size[0], canvas.size[1])), mask=canvas)
    
    # Create a very transparent black cover layer
    cover = Image.new('RGBA', canvas_size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(cover)
    draw.polygon(poly, fill=(0, 0, 0, int(255*cover_opacity)), outline=None)

    # Paste the cover layer on top of the existing image
    canvas.paste(cover, mask=cover)

    return canvas

def paste_image_centered(canvas, image):
    # Calculate the position to paste the image centered on the canvas
    paste_position = (
        (canvas.width - image.width) // 2,
        (canvas.height - image.height) // 2
    )

    # Paste the image onto the canvas
    canvas.paste(image, paste_position, image)


if __name__ == "__main__":
    # Check if the image path is provided as a command-line argument
    if len(sys.argv) != 2:
        print("Usage: python script.py <image_path>")
        sys.exit(1)

    # Get the image path from the command-line argument
    input_image_path = sys.argv[1]

    # Load the image
    original_image = Image.open(input_image_path)
    print("size:", original_image.size)
    # original_image = original_image.crop((0, 0, 1200, int(885 * 0.75)))
    # print("size:", original_image.size)
    filtered_image = apply_transparency_threshold(original_image, int(255 * 0.5))
    cropped_image = crop_transparent(filtered_image)

    # Compute the mean RGB color of the image
    mean_color = compute_mean_color(cropped_image)
    print("Mean RGB Color:", mean_color)

    # Compute the top 5 most common RGB colors of the image
    top_colors = compute_top_colors(cropped_image, num_colors=5)
    print("Top 5 Colors:", top_colors)
    if color_distance(top_colors[0][0:3], (0, 0, 0)) <= 20:
        top_colors[0] = (255, 255, 255, 255)
    if color_distance(top_colors[1][0:3], (0, 0, 0)) <= 20:
        top_colors[1] = (255, 255, 255, 255)

    # Create a 1:1 aspect ratio blank canvas
    size = int(max(cropped_image.width, cropped_image.height) * 2)
    canvas_size = (size, size)
    
    # create hexagon vertices for poly shape
    hexagon = create_hexagon_vertices(canvas_size)
    print("Hexagon: ", hexagon)
    
    alpha = 0.8
    # create hexagon gradient image
    hexagon_canvas = create_linear_gradient(
        canvas_size, 
        hexagon, 
        (top_colors[0][0:3]) + (int(255 * alpha), ), 
        (top_colors[1][0:3]) + (int(255 * alpha), ),
        0.25
    )

    paste_image_centered(hexagon_canvas, cropped_image)

    # Save or display the resulting images as needed
    hexagon_canvas.save("final_canvas.png")


