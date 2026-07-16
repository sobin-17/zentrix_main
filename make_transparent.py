import sys
from PIL import Image

def process_image(input_path, output_path):
    print(f"Processing {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    transparent_count = 0
    for r, g, b, a in data:
        alpha = max(r, g, b)
        if alpha == 0:
            new_data.append((0, 0, 0, 0))
            transparent_count += 1
        else:
            r_new = min(255, int(r * 255 / alpha))
            g_new = min(255, int(g * 255 / alpha))
            b_new = min(255, int(b * 255 / alpha))
            new_data.append((r_new, g_new, b_new, alpha))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")
    print(f"Total fully transparent pixels: {transparent_count}")

if __name__ == "__main__":
    process_image("public/logo5_transparent.png", "public/logo5_alpha.png")
